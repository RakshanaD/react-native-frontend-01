import "../awsConfig";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithRedirect } from "aws-amplify/auth";
import { Linking } from "react-native";
import {fetchAuthSession } from "aws-amplify/auth";
import { router } from "expo-router";
import {useEffect} from "react";

export default function Login() {
  console.log("🟡 Login screen rendered");

  const handleGoogleLogin = async () => {
    console.log("🔵 Google button pressed");
    try {
      const { tokens } = await fetchAuthSession();
      if (tokens?.accessToken) {
        console.log("⚠️ Already signed in, routing to home");
       //router.replace("/");
       router.replace("/schedule-pickup");
      
        return;
      }
    } catch (_) {}
    
    try {
      console.log("🔵 Calling signInWithRedirect...");
      await signInWithRedirect({
        provider: "Google"
      });    } catch (error: any) {
      console.log("🔴 signInWithRedirect error:", error.message, error);
    }
  };
  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      console.log("🔗 Initial URL on login screen:", url);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>goodreturn</Text>
      <Text style={styles.title}>Sign in</Text>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#fff"
  },

  googleButton:{
  },

  googleText:{

  },

  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10
  },

  title: {
    fontSize: 24,
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center"
  },

  primaryText: {
    color: "white",
    fontWeight: "600"
  },

  orText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#777"
  },

  socialButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },

  signIn: {
    textAlign: "center",
    marginTop: 20,
    color: "#2563eb"
  }
});