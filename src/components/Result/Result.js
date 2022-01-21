import React, { useState, useEffect, useCallback } from "react";
import "./Result.css";
import axios from "axios";
import { useHistory } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import { Link } from "react-router-dom";

const Result = (props) => {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [planetName, setPlanetName] = useState("");
  const [loading, setLoading] = useState(true);

  const state = props.location.state;
  const { response, error } = useAxios({
    method: "POST",
    url: "/token",
    headers: {
      Accept: "application/json",
    },
    body: {},
  });
  const history = useHistory();

  const getResult = useCallback(
    async function () {
      // console.log("starting useCallback");
      await axios({
        method: "post",
        url: "https://findfalcone.herokuapp.com/find",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          token: token,
          planet_names: state.selectedPlanets,
          vehicle_names: state.selectedVehicles,
        },
      })
        .then((res) => {
          if (res.data.status) {
            setResultMessage("Hurray! You find Falcone!");
            setPlanetName(res.data.planet_name);
          } else {
            setResultMessage("Sorry! You could not find Falcone!");
          }
          setStatus(res.data.status);
          setLoading(false);
          // console.log("find api response: ", res.data);
        })
        .catch((error) => console.log());
    },
    [state, token]
  );

  useEffect(() => {
    if (state) {
      // console.log("response:", response);
      if (response !== null && response !== undefined) {
        setToken(response.token);
        getResult();
      }
    } else {
      history.push("/");
    }
  }, [state, history, token, getResult, response]);

  return (
    <div className="result__container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        console.log(error)
      ) : (
        <div>
          <div className="result__message">{resultMessage}</div>
          {status ? (
            <div>
              <div className="result__total-time">
                Time Taken: {state.totalTime}
              </div>
              <div className="result__planet">Planet : {planetName}</div>
            </div>
          ) : null}
          <div className="play-button">
            <Link
              to={{
                pathname: "/find-falcone",
              }}
            >
              <button
                // onClick={handlePlay}
                className="button-black button-find-falcone"
              >
                Play Again!
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
