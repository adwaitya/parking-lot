import { useEffect } from 'react';
import './parking-slot.scss'

const ParkingSlot = ({ num, isBusy, numberPlate, remove }:any) => {
  
  return (
    <div
      className={`parkingSlot ${isBusy ? 'busy' : ""}`}
      onClick={() => remove(numberPlate)}
    >
      {isBusy ? numberPlate : num}
    </div>
  )
}

export default ParkingSlot