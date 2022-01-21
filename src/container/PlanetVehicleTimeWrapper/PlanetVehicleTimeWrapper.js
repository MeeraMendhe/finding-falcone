import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./PlanetVehicleTimeWrapper.css";

import Result from "../../components/Result/Result";
import PlanetSelector from "../../components/PlanetSelector/PlanetSelector";
import VehicleSelector from "../../components/VehicleSelector/VehicleSelector";

export default class PlanetVehicleTimeWrapper extends Component {
  constructor() {
    super();
    this.state = {
      planets: null,
      vehicles: null,
      selectPlanets: 4,
      selectedPlanetVehicleDetails: null,
      findFalconeButtonDisable: true,
      totalTime: 0,
      isLoading: true,
    };
  }

  originalPlanets = [];
  originalVehicles = [];

  callPlanetsAPI() {
    axios
      .get("https://findfalcone.herokuapp.com/planets")
      .then((response) => {
        this.setState({ planets: response.data });
        this.originalPlanets.push(response.data);
        this.hideLoader();
      })
      .catch((err) => {
        console.log("planets api error:", err);
      });
  }

  callVehiclesAPI() {
    axios
      .get("https://findfalcone.herokuapp.com/vehicles")
      .then((response) => {
        this.setState({ vehicles: response.data });
        this.originalVehicles.push(response.data);
      })
      .catch((err) => {
        console.log("vehicles api error:", err);
      });
  }

  hideLoader() {
    this.setState({ isLoading: false });
  }

  buildSelectionDetails() {
    let createDetails = [...Array(this.state.selectPlanets).keys()].map(
      (index) => ({
        id: "planet" + index,
        isSelected: false,
        selectedPlanet: "Planet",
        selectedVehicle: "",
        eligibleVehicles: [],
        selectedPlanetImg: "dummy_planet",
        distance: null,
        timeTaken: 0,
      })
    );

    this.setState({ selectedPlanetVehicleDetails: createDetails });
  }

  componentDidMount() {
    // console.log("did mount");
    this.buildSelectionDetails();
    this.callPlanetsAPI();
    this.callVehiclesAPI();
  }

  handlePlanetSelected = (e) => {
    let selectedPlanetId = e.target.id;
    let selectedPlanetName = e.target.value;

    let selectedPlanet = this.state.selectedPlanetVehicleDetails.filter(
      (planet) => {
        return planet.id === selectedPlanetId;
      }
    );

    let selectedPlanetDetails = selectedPlanet[0];
    this.filterRemainingPlanets(selectedPlanetDetails, selectedPlanetName);

    let selectedPlanetVehicleDetails = [
      ...this.state.selectedPlanetVehicleDetails,
    ];

    selectedPlanetVehicleDetails.map((details) => {
      if (details.id === selectedPlanetId) {
        details.isSelected = true;
        details.selectedPlanet = selectedPlanetName;
        details.selectedPlanetImg = selectedPlanetName;
      }
      return "";
    });

    let planet = this.state.planets.filter((planet) => {
      return planet.name === e.target.value;
    });

    planet = planet[0];

    this.setState({ selectedPlanetVehicleDetails });
    this.handleVehicles(planet, selectedPlanetId);
  };

  handleVehicles = (planet, selectedPlanetId) => {
    let eligibleVehicles = this.state.vehicles.filter((vehicle) => {
      return vehicle.max_distance >= planet.distance;
    });

    let selectedPlanetVehicleDetails = [
      ...this.state.selectedPlanetVehicleDetails,
    ];
    selectedPlanetVehicleDetails.map((planet) => {
      if (planet.id === selectedPlanetId) {
        planet.eligibleVehicles = eligibleVehicles;
      }
      return "";
    });

    this.setState({ selectedPlanetVehicleDetails });
  };

  handleVehicleSelected = (e) => {
    let selectedPlanetVehicleDetails = [
      ...this.state.selectedPlanetVehicleDetails,
    ];

    selectedPlanetVehicleDetails.map((selection) => {
      // console.log(e.target.id, ", s: ", selection.id);
      if (selection.id === e.target.id) {
        if (selection.selectedVehicle === "") {
          this.handleVehicleCountWhenNotSelected(e);
        } else {
          this.handleVehicleCountWhenAlreadySelected(e);
        }
        selection.selectedVehicle = e.target.value;
      }
      return "";
    });

    // console.log(selectedPlanetVehicleDetails);

    this.setState({ selectedPlanetVehicleDetails });
    this.changeButtonState();
    this.handleTime(e);
  };

  handleVehicleCountWhenNotSelected = (e) => {
    let vehicles = [...this.state.vehicles];
    vehicles.map((v) => {
      if (e.target.value === v.name) v.total_no -= 1;
      return "";
    });

    this.setState({ vehicles });
  };

  handleVehicleCountWhenAlreadySelected = (e) => {
    let prevVehicle = this.state.selectedPlanetVehicleDetails.filter(
      (selection) => {
        return selection.id === e.target.id;
      }
    )[0].selectedVehicle;

    let vehicles = [...this.state.vehicles];
    vehicles.map((v) => {
      if (e.target.value === v.name) v.total_no -= 1;
      if (v.name === prevVehicle) v.total_no += 1;
      return "";
    });

    this.setState({ vehicles });
  };

  handleTime = (e) => {
    let selectedObj = this.state.selectedPlanetVehicleDetails.filter(
      (selected) => {
        return selected.id === e.target.id;
      }
    );

    let planetSelected = selectedObj[0].selectedPlanet;
    let planetObj = this.originalPlanets[0].filter((planet) => {
      return planetSelected === planet.name;
    });

    let distance = planetObj[0].distance;

    let vehicleObj = this.state.vehicles.filter((vehicle) => {
      return vehicle.name === e.target.value;
    });
    let speed = vehicleObj[0].speed;
    let time = distance / speed;

    let selectedPlanetVehicleDetails = [
      ...this.state.selectedPlanetVehicleDetails,
    ];
    selectedPlanetVehicleDetails.map((selected) => {
      if (selected.id === e.target.id) selected.timeTaken = time;
      return "";
    });

    this.setState({ selectedPlanetVehicleDetails });

    this.calculateTotalTimeTaken();
  };

  calculateTotalTimeTaken() {
    let selectedPlanetVehicleDetails = [
      ...this.state.selectedPlanetVehicleDetails,
    ];

    let totalTime = 0;
    selectedPlanetVehicleDetails.map((d) => {
      totalTime += d.timeTaken;
      return "";
    });

    this.setState({ totalTime });
  }

  changeButtonState() {
    let selectedPlanetVehicleDetails = [
      ...this.state.selectedPlanetVehicleDetails,
    ];

    var count = selectedPlanetVehicleDetails.filter(
      (selected) => selected.isSelected && selected.selectedVehicle
    );

    if (count.length === 4) this.setState({ findFalconeButtonDisable: false });
  }

  filterRemainingPlanets(selectedPlanetDetails, selectedPlanetName) {
    let remainingPlanets = null;

    if (selectedPlanetDetails.isSelected === false) {
      remainingPlanets = this.state.planets.filter(
        (planet) => planet.name !== selectedPlanetName
      );
    } else {
      let prevSeletedPlanetDetails = this.originalPlanets[0].filter(
        (planet) => planet.name === selectedPlanetDetails.selectedPlanet
      );

      remainingPlanets = this.state.planets.filter(
        (planet) => planet.name !== selectedPlanetName
      );

      remainingPlanets.push(prevSeletedPlanetDetails[0]);
    }

    this.setState({ planets: remainingPlanets });
  }

  render() {
    return (
      <div className="planet-vehicle-time-container">
        <div className="left">
          Select any 4 Planets and Vehicles you want to search
        </div>
        <div className="planet-vehicle-wrapper">
          {this.state.planets !== null && this.state.vehicles !== null ? (
            this.state.selectedPlanetVehicleDetails.map((planet) => {
              // console.log(this.state.vehicles);
              return (
                <div key={planet.id}>
                  <PlanetSelector
                    id={planet.id}
                    planets={this.state.planets}
                    selectedPlanet={planet.selectedPlanet}
                    planetImg={planet.selectedPlanetImg}
                    handlePlanetSelected={this.handlePlanetSelected}
                  />
                  {planet.isSelected ? (
                    <VehicleSelector
                      vehicleCount={this.state.vehicles}
                      planetDetails={planet}
                      handleVehicleSelected={this.handleVehicleSelected}
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
          <div>Time Taken: {this.state.totalTime}</div>
        </div>
        <div className="find-falcone-button-wrapper">
          {/* {console.log("clicked")} */}
          <Link
            to={{
              pathname: "/result",
              state: {
                selectedPlanets: this.state.selectedPlanetVehicleDetails
                  ? this.state.selectedPlanetVehicleDetails.map(
                      (s) => s.selectedPlanet
                    )
                  : null,
                selectedVehicles: this.state.selectedPlanetVehicleDetails
                  ? this.state.selectedPlanetVehicleDetails.map(
                      (s) => s.selectedVehicle
                    )
                  : null,
                fromGame: true,
                totalTime: this.state.totalTime,
              },
            }}
          >
            <button
              // onClick={() => console.log("Button click")}
              disabled={this.state.findFalconeButtonDisable}
              className="button-black button-find-falcone"
            >
              Find Falcone!
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
