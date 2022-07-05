import { useEffect, useState } from 'react';
import Car from '../../Components/Car/Car';
import Controls from '../../Components/Controls/Controls';
import InfoBoard from '../../Components/InfoBoard/InfoBoard';
import ParkingSlot from '../../Components/ParkingSlot/ParkingSlot';
import ParkingLot from '../../lib/parking-lot';
import './main.scss';

const ROW_LIMIT = 5;
const Main = ({ slotsCount }: any) => {
    const [parkingLot, setParkingLot] = useState<any>(null);
    const [availableSlots, setAvailableSlots] = useState(slotsCount);
    const [rows, setRows] = useState<any>([]);
    const [carAnimation, setCarAnimation] = useState(true);
    const [infoBoardVisible, setInfoBoardVisible] = useState(false);
  
    useEffect(() => {
      setParkingLot(new ParkingLot(slotsCount));
    }, [slotsCount]);
  
    useEffect(() => {
      function distributeSlotsToRows() {
        let rowsCount = Math.ceil(slotsCount / ROW_LIMIT);
        let rowsData = [];
        let row = [];
       
        while (slotsCount > 0 && rowsCount > 0) {
          // It's important first to decrement the count of the slots otherwise we will miss one
          slotsCount--;
  
          const slot = parkingLot?.slots[slotsCount];
          const isSlotTaken = slot !== null && slot !== undefined;
          row.push({
            slotNum: slotsCount,
            isBusy: isSlotTaken,
            numberPlate: slot,
          });
          if (slotsCount % ROW_LIMIT === 0) {
            rowsCount--;
            rowsData.push(row);
            row = [];
          }
          console.log('rows--', rowsData)
        }
  
        setRows(rowsData);
      }
      distributeSlotsToRows();
      console.log(rows);
    }, [slotsCount, availableSlots]);
  
    const handleAddToParking = (carId: string) => {
      if (parkingLot.isFull()) {
        setInfoBoardVisible(true);
        return;
      }
  
      parkingLot.park(carId);
      setAvailableSlots(parkingLot.getAvailable());
      setCarAnimation((state) => !state);
    };
  
    const handleRemoveFromParking = (carId: string) => {
      if (carId) {
        parkingLot.remove(carId);
        setAvailableSlots(parkingLot.getAvailable());
        setCarAnimation((state) => !state);
      }
    };
  
    const handleGetInfo = () => {
      setInfoBoardVisible((state) => !state);
    };
    return (
        <>
         <section className='main'>
        {rows.map((row:any, idx: number) => (
          <div key={row + idx} className='row'>
            {row.map(({ slotNum, isBusy, numberPlate }:any) => (
              <ParkingSlot
                remove={handleRemoveFromParking}
                key={slotNum + idx}
                num={slotNum}
                isBusy={isBusy}
                numberPlate={numberPlate}
              />
            ))}
          </div>
        ))}
      </section>
      <section className='dashboard'>
        <InfoBoard availableSlotsCount={availableSlots} />
        <Controls add={handleAddToParking} getInfo={handleGetInfo} />
        <div className='footerNote'>
          Click on a busy parking slot to unpark the car.
        </div>
        <Car animationState={carAnimation} />
      </section>
        </>
    )
}

export default Main