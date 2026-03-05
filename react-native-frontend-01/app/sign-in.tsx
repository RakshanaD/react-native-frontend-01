import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signIn } from "aws-amplify/auth";
import { router } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn({ username: email, password });
      router.replace("/" as any);
    } catch (error: any) {
      console.log("Full error:", JSON.stringify(error));
      console.log("Error name:", error.name);
      console.log("Error message:", error.message);
      console.log("Underlying:", JSON.stringify(error.underlyingError, Object.getOwnPropertyNames(error.underlyingError)));
      alert(error.message + " | " + error.name);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>goodreturn</Text>
      <Text style={styles.title}>Sign In</Text>

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
        secureTextEntry
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
        <Text style={styles.primaryText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.signUp}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={() => router.push("/sign-up")}>Sign Up</Text>
      </Text>
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
  signUp: {
    textAlign: "center",
    marginTop: 20,
    color: "#777"
  },
  link: {
    color: "#2563eb"
  }
});