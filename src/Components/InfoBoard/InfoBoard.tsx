import './info-board.scss'

const InfoBoard = ({availableSlotsCount}: any) => {
  return (
    <div className="infoBoard">
      <h3>Parking Lot Software Inc.</h3>
      <div>
        Available slots: <span>{availableSlotsCount}</span>
      </div>
    </div>
  )
}

export default InfoBoard