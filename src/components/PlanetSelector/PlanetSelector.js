import { useState } from "react";
import "./PlanetSelector.css";

const PlanetSelector = (props) => {
  const [planetImg, setPlanetImg] = useState("");

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
