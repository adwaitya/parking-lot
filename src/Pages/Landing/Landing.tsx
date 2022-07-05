import { useForm } from "react-hook-form";
import "./landing.scss";
const PARKING_SIZE = 20;

const Landing = ({ triggerTransition, setParkingSlotsCount }:any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });


  const onSubmit = (data:any) => {
    const parkingSize = Number(data.parkingSize);
    if (parkingSize && typeof parkingSize === "number") {
      setParkingSlotsCount(parkingSize);
    }
    triggerTransition();
  };

  return (
    <div className="flex landing">
      <section>
        <h1>Welcome to Parking Lot Software Inc.</h1>
      </section>
      <section>
        <header className="title">How many parking slots you need?</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder={`Enter your desired size here (1-${PARKING_SIZE})`}
            type="number"
            {...register("parkingSize", {
              required: true,
              maxLength: 2,
              min: 1,
              max: PARKING_SIZE,
            })}
          />

          {errors.parkingSize && (
            <p className="errorMessage">
              Parking slots count should be between 1 and {PARKING_SIZE}{" "}
              (including).
            </p>
          )}
          <input type="submit" className="submitBtn" />
        </form>
      </section>
    </div>
  );
};

export default Landing;
