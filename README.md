# sample-auth-express-app

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
