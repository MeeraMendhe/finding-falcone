import React from "react";

import "./Story.css";

const Rules = (props) => {
  console.log(
    "Story component originalPlanets: ",
    props.originalPlanets,
    props.planetsLoading
  );
  console.log(
    "Story component originalVehicles: ",
    props.originalVehicles,
    props.vehiclesLoading
  );

  return (
    <div className="story-container">
      <p>
        The story is about the planet of Lengaburu in the distant galaxy of Tara
        B.
      </p>
      <p>
        After the recent war with neighbouring planet Falicornia, King Shan has
        exiled the Queen of Falicornia for 15 years.
      </p>

      <p>
        Queen Al Falcone is now in hiding. But if King Shan can find her before
        the years are up, she will be exiled for another 15 years.
      </p>

      <p>
        King Shan has received intelligence that Al Falcone is hiding in one of
        these 6 planets - DonLon, Enchai, Jebing, Sapir, Lerbin &amp; Pingasor.
        However he has limited resources at his disposal &amp; can send his army
        to only 4 of these planets.
      </p>
      <h2 className="text-center">Potentail Hideouts</h2>
      {!props.planetsLoading ? (
        <div className="planets-wrapper">
          {/* <h2 className="text-center">POTENTIAL HIDEOUTS</h2> */}
          {props.originalPlanets.map((planet) => (
            <div key={planet.name} id="planets" className="row">
              <div className="col text-center">
                <figure>
                  <img
                    className="rounded-circle planet-size"
                    src={
                      require(`../../assets/images/planets/${planet.name}.png`)
                        .default
                    }
                    alt={planet.name}
                  />
                  <figcaption>
                    <b>{planet.name}</b>
                    <br />
                    Distance - <code>{planet.distance}</code>
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <h2 className="text-center">Available Vehicles</h2>
      {!props.vehiclesLoading ? (
        <div>
          <div className="row">
            <div className="col text-center">
              <p>
                These are the list of vehicles and their details that are
                available at King Shan's disposal.
              </p>
            </div>
          </div>
          <div id="vehicles" className="row vehicles-wrapper">
            {props.originalVehicles.map((vehicle) => (
              <div key={vehicle.name} className="col text-center ">
                <figure>
                  <img
                    className="vehicle-size"
                    src={
                      require(`../../assets/images/vehicles/${vehicle.name}.png`)
                        .default
                    }
                    alt="Space Pod"
                  />
                  <figcaption>
                    <b>{vehicle.name}</b>
                    <br />
                    Max Distance - <code>{vehicle.max_distance} MM</code>
                    <br />
                    Speed - <code>{vehicle.speed} MM/hour</code>
                    <br />
                    Units Available - <code>{vehicle.total_no}</code>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="help-king-shan-text">
        <div className="col text-center">
          <h2>Can you help King Shan in finding Queen Al Falcone?</h2>
        </div>
      </div>
      <div className="button-wrapper">
        <a href="/find-falcone">
          <button className="button-green button button-start">
            Let's Start!
          </button>
        </a>
      </div>
    </div>
  );
};

export default Rules;
