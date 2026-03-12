import { useEffect } from "react";
import { Slot, router } from "expo-router";
import { getCurrentUser, fetchAuthSession, signOut } from "aws-amplify/auth";
import { Linking } from "react-native";
import { Hub } from "aws-amplify/utils";
import "../awsConfig";
import React from "react";

export default function RootLayout() {
  useEffect(() => {
    console.log("🟡 RootLayout mounted");

    const hubSub = Hub.listen("auth", ({ payload }) => {
      console.log("🔔 Hub auth event:", payload.event);
      if (payload.event === "signedIn") {
        console.log("✅ Hub: signedIn — routing to /");
        router.replace("/schedule-pickup");
      }
      if (payload.event === "signedOut") {
        console.log("🚪 Hub: signedOut — routing to /login");
        router.replace("/login");
      }
    });

    const checkAuth = async () => {
      try {
        console.log("🔍 Validating session with Cognito...");
        // fetchAuthSession actually hits Cognito to validate/refresh
        const session = await fetchAuthSession({ forceRefresh: true });
        console.log("✅ Session valid:", session.tokens?.accessToken ? "has token" : "no token");
        
        if (session.tokens?.accessToken) {
          router.replace("/");
        } else {
          throw new Error("No tokens");
        }
      } catch (err: any) {
        console.log("❌ Session invalid, clearing and going to login:", err.message);
        // Force clear the bad cached session
        try {
          await signOut();
        } catch (_) {}
        router.replace("/login");
      }
    };

    checkAuth();

    return () => {
      hubSub();
    };
  }, []);

  return <Slot />;
}