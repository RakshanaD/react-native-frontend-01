import "../awsConfig";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "aws-amplify/auth";
import { router } from "expo-router";

export default function Home() {
    console.log("Home screen rendered"); // add this
  
    const handleSignOut = async () => {
      await signOut();
      router.replace("/sign-up" as any);
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome home!</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" }, title: { fontSize: 24, marginBottom: 30 },
  button: { backgroundColor: "#2563eb", padding: 15, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "600" }
});