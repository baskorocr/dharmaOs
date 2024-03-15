import React, { useState, useEffect } from "react";
import controlEme from "./controlEme";
import "../Assets/index.css";
import axios from "axios";
import database from "../firebase";
import { ref, set, push } from "firebase/database";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import stopCharge from "./stopCharge";

function App() {
  const navigate = useNavigate();
  const [formatedTime, setFormatedTime] = useState("0:00");
  const sharedVariable = useSelector((state) => state.sharedVariable);

  //handler api
  const apiUrl =
    "ws://10.20.27.100/api/outlets/" + sharedVariable + "/statestream";
  const apiMachine = "http://10.20.27.150:8080/api/PostMonitoring";
  const machine = JSON.parse(localStorage.getItem("myData"));
  const [data, setData] = useState({});
  const rootRef = ref(database, "machine/" + process.env.REACT_APP_API_MCN);
  const kWh = JSON.parse(localStorage.getItem("kWh"));
  useEffect(() => {
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handlePage, { passive: false });

    const socket = new WebSocket(apiUrl);

    // WebSocket event handlers
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      setData(jsonData);

      if (jsonData["pilot"] === 7) {
        controlEme(navigate, sharedVariable);
      }
      if (jsonData["phs"] === 8) {
        navigate("/home");
      }

      const minute = Math.floor(jsonData["curr_ses_secs"] / 60);
      const second = jsonData["curr_ses_secs"] % 60;
      const format =
        minute.toString().padStart(2, "0") +
        ":" +
        second.toString().padStart(2, "0");
      setFormatedTime(format);

      //send Firebase monitoring System
      set(rootRef, {
        kWh: kWh,
        identity: machine.identity,
        status: jsonData["EVRESSSOC"] === undefined ? 0 : jsonData["EVRESSSOC"],
        ampere: jsonData["evsemaxc"] === undefined ? 0 : jsonData["evsemaxc"],
        timeToFull:
          jsonData["TimeToFull"] === undefined ? 0 : jsonData["TimeToFull"],
        power: parseFloat(data["curr_ses_Wh"] / 1000).toFixed(2),
      });

      finish();
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("Connection abruptly closed");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      {
        socket.close();
        window.removeEventListener("wheel", handlePage);
      }
    };
  }, []);

  //set handle for onClick event button Stop
  const backHome1 = () => {
    set(rootRef, {
      kWh: 0,
      identity: machine.identity,
      status: 0,
      ampere: 0,
      timeToFull: 0,
      power: 0,
    });
    stopCharge(sharedVariable, navigate); //call function file stopCharge
  };

  function finish() {
    const DatakWh = parseFloat(data["curr_ses_Wh"] / 1000).toFixed(2);
    if (DatakWh === kWh) {
      stopCharge(sharedVariable, navigate);
    }
  }

  //css style for update data percent in dashboard
  const style1 = {
    borderRadius: "5px",
    height: "40px",
    backgroundColor: "#d9d9d9",
    marginTop: "1%",
    width: "900px",
  };
  const style2 = {
    borderRadius: "5px",
    height: "40px",
    backgroundColor: "#0c8542",
    width: data["EVRESSSOC"] + "%",
  };

  return (
    <div className="animate__animated animate__fadeIn top">
      <img
        className={"logo2 d-flex justify-content-center mt-4"}
        src={require("../Assets/img/logo.png")}
        alt=""
      />

      <div className="row">
        <div className="col-1">
          <img
            className={"chargingS d-flex"}
            src={require("../Assets/img/chargingS.png")}
            alt=""
          />
        </div>
        <div className="col dash">
          <div className="row mt-5 progress" style={style1}>
            <div style={style2}></div>
          </div>
          <div className="row persen justify-content-center">
            {data["EVRESSSOC"] === undefined ? 0 : data["EVRESSSOC"]}%
          </div>
          <div className="row tables">
            <div className="col-4 ">
              {" "}
              <div className="cols">
                <div>Current</div>
                <div className="data">{data["evsemaxc"]} A</div>
              </div>
            </div>
            <div className="col-4">
              <div className="cols">
                <div>Voltage</div>
                <div className="data">{data["pv"]} V</div>
              </div>
            </div>
            <div className="col-4">
              <div className="cols">
                <div>Energy</div>
                <div className="data">
                  {data["curr_ses_Wh"] === "NaN"
                    ? 0
                    : parseFloat(data["curr_ses_Wh"] / 1000).toFixed(2)}{" "}
                  kWh
                </div>
              </div>
            </div>
          </div>

          <div className="row tables">
            <div className="col-4">
              <div className="cols">
                <div>Power</div>
                <div className="data">{data["pp"] / 1000} kW</div>
              </div>
            </div>
            <div className="col-4">
              <div className="cols">
                <div>Elapsed Time</div>
                <div className="data">{formatedTime}</div>
              </div>
            </div>
            <div className="col-4">
              <div className="cols">
                <div>Outlet Type</div>
                <div className="data">
                  {sharedVariable === "ccs"
                    ? "CCS2"
                    : sharedVariable === "ac"
                    ? "AC"
                    : "CHADEMO"}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              onClick={backHome1}
              id="btnFinis"
              className=" d-flex-justify-content-center"
            >
              <img
                id="text"
                className="imgStop"
                alt="cek"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdlJREFUWEftl9FRAzEMRKVOkkoglUAqASqBVEI6IVSyzGbOGSFsWXb4CMz5J5mzz/duJa18Kjc29MZ45P8BAXgSkedF6RdVLf+nxL9aoRWop/uqkFcIwEZENqp65FxLoWWdqOqpp7KdH0pqAKwgVtWlmgIgrn0QkcNI5aWBALyLyL0vbwPJKQta4Hn9pKrbjFIpIAcTPdgCPYrIq4FIQXWBIpglh6wS34zRqcflb6q6j5QKgQAwRAxVGbuSzOVCK2Rm3iv1Y490Ujt1qm/XA6qoeFTVXUulpkJeHVWtrk0C0So+IqXLXATEhKTcYewzQItKdr9mE84CNeM+AGTzsRm2CIgSU2qO7ajj+hxZnLuErWkBERAucW3kT8bo7BoAZc8pIKtQWKoZsGyRRApVW0Xm4bU1AKwfTeWQdeDQOzKQAFJVm/UhHiEYtqGjhHHrX/EhbsK3Kh1+WiXn+GGTHe1lw18VLnco2nwvqzgsL6WhKt2+q3Lm+OFDRyjm0t53fpczrNJirOd7Moe0LtCiUg2qgPGX5+tPEbkzOWeLr6tMt7k2rJ9ewjP1yEiHmJumFHL2T7V6YAzpYTkhDlnFMFAFrtgCQflw5sr5E2lmXAU088DePSvQn1PoCwkNKjSXsc07AAAAAElFTkSuQmCC"
              />

              <text className="btnStop">Stop Charging</text>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
