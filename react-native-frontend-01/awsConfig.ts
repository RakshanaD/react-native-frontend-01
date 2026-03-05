import { Amplify } from "aws-amplify";

const config = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_8CraYpmn0",
      userPoolClientId: "6r9mph3f9v4nn2vr6te5okjbke"
    }
  }
};

Amplify.configure(config);