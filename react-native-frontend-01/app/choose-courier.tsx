import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { router } from "expo-router";

type Courier = {
  name: string;
  logo: any;
  items: number;
};

const couriers: Courier[] = [
  { name: "UPS Return", logo: require("../assets/ups.png"), items: 0 },
  { name: "FedEx Return", logo: require("../assets/fedex.png"), items: 0 },
  { name: "USPS Return", logo: require("../assets/usps.png"), items: 0 },
  { name: "In Store Return", logo: require("../assets/store.png"), items: 0 },
];

export default function ChooseCourier() {
  const [selectedCourier, setSelectedCourier] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Courier</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>16 Feb, 2024 – 9:00 – 11:00 AM</Text>
      </View>

      <ScrollView style={styles.courierList} contentContainerStyle={{ paddingBottom: 100 }}>
        {couriers.map((c) => (
          <TouchableOpacity
            key={c.name}
            style={[styles.courierCard, selectedCourier === c.name && styles.selectedCard]}
            onPress={() => setSelectedCourier(c.name)}
          >
            <Image source={c.logo} style={styles.logo} resizeMode="contain" />
            <View style={{ marginLeft: 12 }}>
              <Text style={[styles.courierName, selectedCourier === c.name && styles.selectedText]}>
                {c.name}
              </Text>
              <Text style={[styles.courierItems, selectedCourier === c.name && styles.selectedText]}>
                {c.items} Item{c.items !== 1 ? "s" : ""}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.note}>
          Important: Please be aware that illegal or dangerous items are not allowed to be shipped
          using this service. You are solely responsible for ensuring the contents of all packages
          comply with our guidelines.
        </Text>
      </ScrollView>

      <TouchableOpacity
        style={[styles.nextButton, !selectedCourier && styles.nextButtonDisabled]}
        onPress={() => selectedCourier && router.push("/confirm-courier" as any)}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.bottomTabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Packages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Tracking</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#1b213a",
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 22,
  },
  dateContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },
  courierList: {
    padding: 20,
  },
  courierCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F6F7FB",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: "#1b213a",
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  logo: {
    width: 40,
    height: 40,
  },
  courierName: {
    fontWeight: "700",
    fontSize: 16,
  },
  courierItems: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 4,
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 18,
  },
  nextButton: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
    backgroundColor: "#1b213a",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  bottomTabs: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1b213a",
    paddingVertical: 12,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});