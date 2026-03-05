import { useEffect } from "react";
import { Slot, router } from "expo-router";
import { getCurrentUser } from "aws-amplify/auth";
import "../awsConfig";

export default function RootLayout() {
  useEffect(() => {
    getCurrentUser()
      .then(() => {
        console.log("logged in, going home");
        router.replace("/" as any);
      })
      .catch(() => {
        console.log("not logged in, going to sign-up");
        router.replace("/sign-up" as any);
      });
  }, []);

  return <Slot />;
}