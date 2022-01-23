import "./VehicleSelector.css";

const VehicleSelector = (props) => {
  return (
    <div className="vehicle-selector">
      {props.planetDetails.eligibleVehicles.map((vehicle) => (
        <div className="radio-btn" key={vehicle.name}>
          <input
            disabled={
              props.vehicleCount.filter((v) => {
                return v.name === vehicle.name;
              })[0].total_no === 0
                ? true
                : false
            }
            onChange={props.handleVehicleSelected}
            checked={props.planetDetails.selectedVehicle === vehicle.name}
            type="radio"
            name={props.planetDetails.id}
            id={props.planetDetails.id}
            value={vehicle.name}
          />
          <label className="vehicle-wrapper">
            <label className="vehicle-name">{vehicle.name} </label>
            <span className="vehicle-count">
              (
              {
                props.vehicleCount.filter((v) => {
                  return v.name === vehicle.name;
                })[0].total_no
              }
              )
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default VehicleSelector;
