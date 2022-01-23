import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Play.css";
import { DataContext } from "../../context/DataContext";
import PlanetSelector from "../../components/PlanetSelector/PlanetSelector";
import VehicleSelector from "../../components/VehicleSelector/VehicleSelector";

function Play() {
  const dataContext = useContext(DataContext);
  const { planets, vehicles, planetsLoading, vehiclesLoading } = dataContext;
  const [remainingPlanets, setRemainingPlanets] = useState(null);
  const [remainingVehicles, setRemainingVehicles] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState();
  const [findFalconeButtonDisable, setFindFalconeButtonDisable] =
    useState(true);
  const [buildDone, setBuildDone] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  //     const state = {
  //       planets: null,
  //       vehicles: null,
  //       selectPlanets: 4,
  //       selectedPlanetVehicleDetails: null,
  //       findFalconeButtonDisable: true,
  //       totalTime: 0,
  //       isLoading: true,
  //     };
  //   const originalPlanets = [];
  //   const originalVehicles = [];

  function buildSelectionDetails() {
    const createDetails = [...Array(4).keys()].map((index) => ({
      id: "planet" + index,
      isSelected: false,
      selectedPlanet: "Planet",
      selectedVehicle: "",
      eligibleVehicles: [],
      selectedPlanetImg: "dummy_planet",
      distance: null,
      timeTaken: 0,
    }));
    setSelectedDetails(createDetails);
  }

  useEffect(() => {
    if (!planetsLoading) setRemainingPlanets(planets);
    if (!vehiclesLoading) setRemainingVehicles(vehicles);
    buildSelectionDetails();
    setBuildDone(true);
  }, [planetsLoading, planets, vehiclesLoading, vehicles]);

  const handlePlanetSelected = (e) => {
    const selectedPlanetId = e.target.id;
    const selectedPlanetName = e.target.value;
    const selectedPlanetDetails = selectedDetails.filter((planet) => {
      return planet.id === selectedPlanetId;
    })[0];

    filterRemainingPlanets(selectedPlanetDetails, selectedPlanetName);

    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((details) => {
      if (details.id === selectedPlanetId) {
        details.isSelected = true;
        details.selectedPlanet = selectedPlanetName;
        details.selectedPlanetImg = selectedPlanetName;
      }
      return "";
    });

    const planet = remainingPlanets.filter((planet) => {
      return planet.name === e.target.value;
    })[0];
    // planet = planet[0];
    setSelectedDetails(newSelectedDetails);
    handleVehicles(planet, selectedPlanetId);
  };

  const handleVehicles = (planet, selectedPlanetId) => {
    const eligibleVehicles = vehicles.filter((vehicle) => {
      return vehicle.max_distance >= planet.distance;
    });

    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((planet) => {
      if (planet.id === selectedPlanetId) {
        planet.eligibleVehicles = eligibleVehicles;
      }
      return "";
    });
    setSelectedDetails(newSelectedDetails);
  };

  const handleVehicleSelected = (e) => {
    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((selected) => {
      // console.log(e.target.id, ", s: ", selection.id);
      if (selected.id === e.target.id) {
        selected.selectedVehicle === ""
          ? handleVehicleCountWhenNotSelected(e)
          : handleVehicleCountWhenAlreadySelected(e);
        selected.selectedVehicle = e.target.value;
      }
      return "";
    });
    // console.log(selectedPlanetVehicleDetails);
    setSelectedDetails(newSelectedDetails);
    changeButtonState();
    handleTime(e);
  };

  const handleVehicleCountWhenNotSelected = (e) => {
    const newRemainingvehicles = [...remainingVehicles];
    newRemainingvehicles.map((vehicle) => {
      if (e.target.value === vehicle.name) vehicle.total_no -= 1;
      return "";
    });
    setRemainingVehicles(newRemainingvehicles);
  };

  const handleVehicleCountWhenAlreadySelected = (e) => {
    const tempSelectedDetails = [...selectedDetails];
    const prevVehicle = tempSelectedDetails.filter((selection) => {
      return selection.id === e.target.id;
    })[0].selectedVehicle;

    const newRemainingVehicles = [...remainingVehicles];
    newRemainingVehicles.map((vehicle) => {
      if (e.target.value === vehicle.name) vehicle.total_no -= 1;
      if (vehicle.name === prevVehicle) vehicle.total_no += 1;
      return "";
    });
    setRemainingVehicles(newRemainingVehicles);
  };

  const handleTime = (e) => {
    const selectedObj = selectedDetails.filter((selected) => {
      return selected.id === e.target.id;
    });

    const planetSelected = selectedObj[0].selectedPlanet;
    const planetObj = planets.filter((planet) => {
      return planetSelected === planet.name;
    });

    const distance = planetObj[0].distance;
    const vehicleObj = remainingVehicles.filter((vehicle) => {
      return vehicle.name === e.target.value;
    });

    const speed = vehicleObj[0].speed;
    const time = distance / speed;
    const newSelectedDetails = [...selectedDetails];
    newSelectedDetails.map((selected) => {
      if (selected.id === e.target.id) selected.timeTaken = time;
      return "";
    });
    setSelectedDetails(newSelectedDetails);
    calculateTotalTimeTaken();
  };

  function calculateTotalTimeTaken() {
    const newSelectedDetails = [...selectedDetails];

    const totalTime = newSelectedDetails.reduce(
      (totalTime, selectedDetail) =>
        totalTime + (selectedDetail.timeTaken || 0),
      0
    );

    setTotalTime(totalTime);
  }

  function changeButtonState() {
    const tempSelectedDetails = [...selectedDetails];
    var count = tempSelectedDetails.filter(
      (selected) => selected.isSelected && selected.selectedVehicle
    );
    if (count.length === 4) setFindFalconeButtonDisable(false);
  }

  function filterRemainingPlanets(selectedPlanetDetails, selectedPlanetName) {
    let newRemainingPlanets = null;
    if (selectedPlanetDetails.isSelected === false) {
      newRemainingPlanets = remainingPlanets.filter(
        (planet) => planet.name !== selectedPlanetName
      );
    } else {
      const prevSeletedPlanet = planets.filter(
        (planet) => planet.name === selectedPlanetDetails.selectedPlanet
      )[0];
      newRemainingPlanets = remainingPlanets.filter(
        (planet) => planet.name !== selectedPlanetName
      );
      newRemainingPlanets.push(prevSeletedPlanet);
    }
    setRemainingPlanets(newRemainingPlanets);
  }

  return (
    <div className="planet-vehicle-time-container">
      <div className="left">
        Select any 4 Planets and Vehicles you want to search
      </div>
      <div className="planet-vehicle-wrapper">
        {!planetsLoading && !vehiclesLoading && buildDone ? (
          selectedDetails.map((planet) => {
            return (
              <div key={planet.id}>
                <PlanetSelector
                  id={planet.id}
                  planets={remainingPlanets}
                  selectedPlanet={planet.selectedPlanet}
                  planetImg={planet.selectedPlanetImg}
                  handlePlanetSelected={handlePlanetSelected}
                />
                {planet.isSelected ? (
                  <VehicleSelector
                    vehicleCount={remainingVehicles}
                    planetDetails={planet}
                    handleVehicleSelected={handleVehicleSelected}
                  />
                ) : null}
              </div>
            );
          })
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
      <div className="time-taken-wrapper">
        <div>Time Taken: {totalTime}</div>
      </div>
      <div className="find-falcone-button-wrapper">
        {/* {console.log("clicked")} */}
        <Link
          to="/result"
          state={{
            fromGame: true,
            totalTime: totalTime,
            selectedPlanets: selectedDetails
              ? selectedDetails.map((s) => s.selectedPlanet)
              : null,
            selectedVehicles: selectedDetails
              ? selectedDetails.map((s) => s.selectedVehicle)
              : null,
          }}
        >
          <button
            // onClick={() => console.log("Button click")}
            disabled={findFalconeButtonDisable}
            className="button-black button-find-falcone"
          >
            Find Falcone!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Play;
