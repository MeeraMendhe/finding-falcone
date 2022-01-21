import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useAxios } from "./hooks/useAxios";

import "./App.css";
import Header from "./components/Header/Header";
import PlanetVehicleTimeWrapper from "./container/PlanetVehicleTimeWrapper/PlanetVehicleTimeWrapper";
import Story from "./components/Story/Story";
import Result from "./components/Result/Result";
import Footer from "./components/Footer/Footer";

function App() {
  // const [originalPlanets, setOriginalPlanets] = useState([]);
  // const [originalVehicles, setOriginalVehicles] = useState([]);
  // const { response: products, loading: productsLoading, error: productsError } = useAxios(...)
  const {
    response: planets,
    loading: planetsLoading,
    error: planetsError,
  } = useAxios({
    method: "GET",
    url: "/planets",
  });

  const {
    response: vehicles,
    loading: vehiclesLoading,
    error: vehiclesError,
  } = useAxios({
    method: "GET",
    url: "/vehicles",
  });

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Story
                text="Working Story props passing"
                originalPlanets={planets}
                planetsLoading={planetsLoading}
                planetsError={planetsError}
                originalVehicles={vehicles}
                vehiclesLoading={vehiclesLoading}
                vehiclesError={vehiclesError}
              />
            )}
          />
          <Route
            exact
            path="/find-falcone"
            component={PlanetVehicleTimeWrapper}
          />
          <Route exact path="/result" component={Result} />
          <Route path="*" component={Story} />
        </Switch>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
