import './controls.scss'
import generateNumberPlate from '../../utils/number-plates-generator'

const Controls = ({add, getInfo}: any) => {
  return (
    <div className="controls">
    <button onClick={() => add(generateNumberPlate())}>PARK!</button>
  </div>
  )
}

export default Controls