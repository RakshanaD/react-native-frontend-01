import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { getPickupSlots, PickupSlot } from "./api/pickupApi";

type PickupType = "Doorstep" | "Handover" | "Return Box";

type Slot = {
  id: number;
  date: string;
  time: string;
};

export default function SchedulePickup() {
  const [pickupType, setPickupType] = useState<PickupType>("Doorstep");
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [slots, setSlots] = useState<PickupSlot[]>([]);

  useEffect(() => {
    async function loadSlots() {
      const data = await getPickupSlots();
      setSlots(data);
    }
  
    loadSlots();
  }, []);

  const handleNext = () => {
    if (!selectedSlot) return;
    router.push("/confirm");
  };

  const pickupIcons = {
    Doorstep: "🏠",
    Handover: "🤝",
    "Return Box": "📦",
  };

  return (
    <View style={styles.container}>

      {/* Pickup Type */}
      <Text style={styles.sectionTitle}>Pick up Type</Text>

      <View style={styles.pickupRow}>
        {(["Doorstep", "Handover", "Return Box"] as PickupType[]).map(
          (type) => (
<TouchableOpacity
  key={type}
  style={[styles.pickupCard, pickupType === type && styles.selectedPickup]}
  onPress={() => setPickupType(type)}
>
  <Text style={{ fontSize: 24, marginBottom: 6 }}>
    {pickupIcons[type]}
  </Text>
  <Text style={[styles.pickupText, pickupType === type && styles.selectedText]}>
    {type}
  </Text>
</TouchableOpacity>
          )
        )}
      </View>

      {/* Date Selection */}
      <Text style={styles.sectionTitle}>Select Pick up Date & Time</Text>

      <FlatList
        data={slots}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.slotCard,
              selectedSlot === item.id && styles.selectedSlot,
            ]}
            onPress={() => setSelectedSlot(item.id)}
          >
            <Text style={styles.slotDate}>{item.date}</Text>
            <Text style={styles.slotTime}>{item.time}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 40,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    backgroundColor: "blue"
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
  },

  pickupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  pickupCard: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 5,
  
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3
  },
  
  selectedPickup: {
    backgroundColor: "#2563EB"
  },
  
  pickupText: {
    fontWeight: "600",
    fontSize: 14
  },
  
  selectedText: {
    color: "white"
  },slotCard: {
    width: "48%",
    backgroundColor: "#F6F7FB",
    padding: 20,
    borderRadius: 18,
    marginBottom: 16,
  
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  
  selectedSlot: {
    backgroundColor: "#2563EB"
  },
  
  slotDate: {
    fontWeight: "700",
    fontSize: 16
  },
  
  slotTime: {
    marginTop: 6,
    fontSize: 13,
    color: "#6B7280"
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  nextText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});