const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 8080;

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

// Middleware to authenticate requests
async function authenticateToken(req, res, next) {
  const idToken = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
}

app.use(authenticateToken);

app.get('/', (req, res) => {
  res.send(`Hello ${req.user.name}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
