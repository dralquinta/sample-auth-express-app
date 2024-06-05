const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Initialize the Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

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

app.get('/secure', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.name}` });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
