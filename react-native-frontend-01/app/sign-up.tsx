import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut, signInWithRedirect } from "aws-amplify/auth";

export default function SignUp() {
  const handleGoogleSignIn = async () => {
    console.log("Google button pressed");
    try {
      //await signOut();
      await signInWithRedirect({ provider: "Google" });
    } catch (error: any) {
      console.log("Error:", JSON.stringify(error));
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>goodreturn</Text>
      <Text style={styles.title}>Get Started</Text>
      <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: "center", backgroundColor: "#fff" },
  logo: { fontSize: 30, fontWeight: "bold", color: "#2563eb", marginBottom: 10 },
  title: { fontSize: 24, marginBottom: 40 },
  socialButton: { borderWidth: 1, borderColor: "#ddd", padding: 14, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  socialText: { fontSize: 16, fontWeight: "500" }
});