import { Amplify } from "aws-amplify";

const config = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_LKwY8E0Qe",
      userPoolClientId: "24bq041k1jsdqjuvfv891if1sl",
      loginWith: {
        oauth: {
          domain: "us-east-1lkwy8e0qe.auth.us-east-1.amazoncognito.com",         
          scopes: ["email", "openid", "profile"],
          redirectSignIn: ["goodreturns://callback"],
          redirectSignOut: ["goodreturns://"],
          responseType: "code" as const,
        }
      }
    }
  }
};

Amplify.configure(config);