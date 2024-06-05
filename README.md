# sample-auth-express-app

This is an example of an authenticated app using google services. 

The code contains the statics required to make it work. Make sure to update this accordingly


## Pre-requisites

a. Make sure this org policy is overriden: 

```constraints/iam.allowedPolicyMemberDomains``` Set it to `AllowAll`

b. Run this policy: 

```shell
gcloud beta run services add-iam-policy-binding --region=us-central1 --member=allUsers --role=roles/run.invoker sample-auth-express-app
Updated IAM policy for service [sample-auth-express-app].
bindings:
- members:
  - allUsers
  role: roles/run.invoker
etag: BwYaKGKelsY=
version: 1
```

## OAuth Config

1. Go to APIs & Services
2. Go to Credentials and create OAuth 2.0 ClientID
    Select Web application and set the name to the webapp

3. In authorized JavaScript origins, set the .app that CloudRun returns (i.e.: `https://sample-auth-express-app-r23duvky4a-uc.a.run.app`)
4. In Authorized redirect URI, insert the same uri, preceded by `__/auth/handler` (i.e.: `https://sample-auth-express-app-r23duvky4a-uc.a.run.app/__/auth/handler`)
5. Hit create

6. Go to Identity Platform > Providers and Hit `Add a provider`
7. From drop down, select `Google` and enter Above Client ID and WebClient Secrets
8. Update the code, with the data that comes from Providers > Application Setup Details. You will see something like this: 

```json
<script src="https://www.gstatic.com/firebasejs/8.0/firebase.js"></script>
<script>
  var config = {
    apiKey: "foobar",
    authDomain: "dryruns.firebaseapp.com",
  };
  firebase.initializeApp(config);
</script>
```

Update code and redo image and redeploy. 



## App config and Deploy

1. Build app

```shell
gcloud config set project dryruns
gcloud builds submit --tag gcr.io/dryruns/sample-auth-express-app
```

2. Deploy app to cloudrun

```shell
gcloud run deploy sample-auth-express-app --image gcr.io/dryruns/sample-auth-express-app --platform managed --region us-central1 --allow-unauthenticated
Deploying container to Cloud Run service [sample-auth-express-app] in project [dryruns] region [us-central1]
X  Deploying new service... Done.                                                                                                                                                                                                                 
  OK Creating Revision...                                                                                                                                                                                                                         
  OK Routing traffic...                                                                                                                                                                                                                           
     Setting IAM Policy...                                                                                                                                                                                                                        
Completed with warnings:                                                                                                                                                                                                                          
  Setting IAM policy failed, try "gcloud beta run services add-iam-policy-binding --region=us-central1 --member=allUsers --role=roles/run.invoker sample-auth-express-app"
Service [sample-auth-express-app] revision [sample-auth-express-app-00001-zsf] has been deployed and is serving 100 percent of traffic.
Service URL: https://sample-auth-express-app-r23duvky4a-uc.a.run.app 
```



