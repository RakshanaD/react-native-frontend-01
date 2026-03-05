import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SignUp() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      
      <Text style={styles.logo}>goodreturn</Text>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryText}>Sign Up with Email</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>
        Or, use one of the following options:
      </Text>

      <TouchableOpacity style={styles.socialButton}>
        <Text>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text>Sign up with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Text>Sign up with Facebook</Text>
      </TouchableOpacity>

      <Text style={styles.signIn}>
        Already have an account? Sign In
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