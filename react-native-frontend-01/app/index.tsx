import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import "../awsConfig";
import { signUp, SignUpInput } from "aws-amplify/auth";
import { useRouter } from "expo-router"; // Import the router

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Initialize the router

  const handleSignup = async () => {
    if (!email || !phone) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const signupInput: SignUpInput = {
        username: email,
        password: "TempPassword123!", 
        options: {
          userAttributes: {
            email: email,
            phone_number: phone
          }
        }
      };

      await signUp(signupInput);
      
      Alert.alert("Success", "User created! Check your email for verification.");
      // Optional: router.push("/confirm-signup"); 
    } catch (error: any) {
      Alert.alert("Signup Failed", error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>goodreturn</Text>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Phone Number (+1...)"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity 
        style={[styles.primaryButton, loading && { opacity: 0.7 }]} 
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.primaryText}>
          {loading ? "Creating Account..." : "Sign Up with Email"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>
        Or, use one of the following options:
      </Text>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Sign up with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Sign up with Facebook</Text>
      </TouchableOpacity>

      {/* Updated to navigate to login */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.signIn}>
          Already have an account? <Text style={{ fontWeight: "bold" }}>Sign In</Text>
        </Text>
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
  logo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "500"
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
    marginTop: 10
  },
  primaryText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#777",
    fontSize: 14
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },
  socialText: {
    fontSize: 15,
    color: "#333"
  },
  signIn: {
    textAlign: "center",
    marginTop: 25,
    color: "#2563eb",
    fontSize: 15
  }
});