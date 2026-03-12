export type PickupSlot = {
    id: number;
    date: string;
    time: string;
  };
  
  export async function getPickupSlots(): Promise<PickupSlot[]> {
    // simulate backend delay
    await new Promise((resolve) => setTimeout(resolve, 700));
  
    return [
      { id: 1, date: "Feb 13", time: "09:00 - 11:00 AM" },
      { id: 2, date: "Feb 16", time: "02:00 - 07:00 PM" },
      { id: 3, date: "Feb 20", time: "09:00 - 03:00 PM" },
      { id: 4, date: "Feb 23", time: "09:00 - 11:00 AM" }
    ];
  }