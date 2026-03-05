import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import "../awsConfig";
import { signIn, type SignInInput } from "aws-amplify/auth";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const signInInput: SignInInput = {
        username: email,
        password: password,
      };

      const { isSignedIn, nextStep } = await signIn(signInInput);

      if (isSignedIn) {
        // Redirect to your main app screen (e.g., the package scanning dashboard)
        router.replace("/(tabs)/home" as any);
      } else if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        Alert.alert("Verification Required", "Please verify your email before logging in.");
        // router.push("/signup-confirmation");
      }
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>goodreturn</Text>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hides the password text
        autoCapitalize="none"
      />

      <TouchableOpacity 
        style={[styles.primaryButton, loading && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.primaryText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("Forgot Password clicked")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "500",
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    height: 55,
    justifyContent: "center"
  },
  primaryText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: 15,
    color: "#777",
    fontSize: 14
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40
  },
  footerText: {
    color: "#333",
    fontSize: 15
  },
  signUpLink: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "bold"
  }
});