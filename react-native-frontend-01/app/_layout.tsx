import { Slot } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.customHeader}>
      <View style={styles.customHeader}>
  <Text>
    <Text style={{ color: "white", fontWeight: "700", fontSize: 22 }}>good</Text>
    <Text style={{ color: "#3B82F6", fontWeight: "700", fontSize: 22 }}>returns</Text>
  </Text>
</View>
      </View>

      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  customHeader: {
    backgroundColor: "#1b213a",
    paddingTop: 40,  // accounts for status bar
    paddingBottom: 20,
    alignItems: "center",
  },
});

/*import { useEffect, useState } from "react";
import { Slot, router } from "expo-router";
import { getCurrentUser } from "aws-amplify/auth";
import "../awsConfig";

export default function RootLayout() {
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        await getCurrentUser();
        router.replace("/");
      } catch {
        router.replace("/sign-up");
      } finally {
        setCheckedAuth(true);
      }
    }

    checkUser();
  }, []);

  if (!checkedAuth) return null;

  return <Slot />;
}

*/