import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { confirmSignUp } from "aws-amplify/auth";
import { router, useLocalSearchParams } from "expo-router";

export default function Confirm() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState("");

  const handleConfirm = async () => {
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      router.replace("/sign-in");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>goodreturn</Text>
      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.subtitle}>We sent a code to {email}</Text>
      <TextInput
        placeholder="6-digit code"
        style={styles.input}
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleConfirm}>
        <Text style={styles.primaryText}>Confirm</Text>
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
    marginBottom: 8
  },
  subtitle: {
    color: "#777",
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
  }
});