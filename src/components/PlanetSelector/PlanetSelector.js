import { useState } from "react";

// import dummy_planet from "../../assets/images/planets/dummy_planet.png";
import "./PlanetSelector.css";

const PlanetSelector = (props) => {
  // const [options, setOptions] = useState("");
  const [planetImg, setPlanetImg] = useState("");
  // console.log("PS: In", props.id);

  // console.log(props.id, props.planets, props.vehicles);

  import(`../../assets/images/planets/${props.planetImg}.png`).then((image) => {
    setPlanetImg(image.default);
  });

  return (
    <div className="planet-selector">
      <img src={planetImg} alt="planet" />
      <div>
        <div className="margin-m">
          <strong>Select a Planet</strong>
        </div>
        <select
          className="custom-select"
          onChange={props.handlePlanetSelected}
          id={props.id}
          value={props.selectedPlanet}
        >
          <option>{props.selectedPlanet}</option>
          {props.planets.map((planet) => (
            <option key={planet.name}>{planet.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default PlanetSelector;
