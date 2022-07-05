import { PathString } from "react-hook-form";

class ParkingLot {
    slots:any = [];
  
    constructor(parkingSize:number) {
      this.slots = new Array(parkingSize).fill(null);
    }
  
    park(carId: PathString) {
      console.log(`Parking car: ${carId}`);
      if (this.slots.every((slot:any) => slot !== null)) {
        return false;
      }
  
      for (let i = 0; i <= this.slots.length; i++) {
        const slot = this.slots[i];
  
        if (slot === null) {
          this.slots[i] = carId;
          return true;
        }
      }
    }
  
    remove(carId: string) {
      console.log(`Leaving car: ${carId}`);
      if (this.slots.every((slot: any) => slot !== carId)) {
        return false;
      }
  
      for (let i = 0; i <= this.slots.length; i++) {
        const slot = this.slots[i];
  
        if (slot === carId) {
          this.slots[i] = null;
          return true;
        }
      }
    }
  
    getSlots() {
      console.log(`Parking slots: ${this.slots}`);
      return this.slots;
    }
  
    getSize() {
      console.log(`Parking size is: ${this.slots.length}`);
      return this.slots.length;
    }
  
    getAvailable() {
      const availableSlots = this.slots.filter((s:any) => s === null).length;
      console.log(`Available parking slots: ${availableSlots}`);
      return availableSlots;
    }
  
    isFull() {
      return this.getAvailable() === 0;
    }
  }
  
  export default ParkingLot;
  