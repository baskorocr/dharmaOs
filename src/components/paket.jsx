import React, { useState, Component } from "react";
import "../Assets/index.css";
import "react-simple-keyboard/build/css/index.css";
import SimpleKeyboard from "react-simple-keyboard";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("myData");
  const parse = JSON.parse(storedData);
  const url = process.env.REACT_APP_API_URL + "/api/outlets/ccs/state";

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    console.log(value);
    setInputValue(value);
  };

  const customLayout = {
    default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
  };
  const keypad = {
    width: "50px",
  };

  const navigateToHome = () => {
    // Use the navigate function to navigate to the home route
    navigate("/home");
  };

  const full = async () => {
    try {
      await axios.get(url).then((response) => {
        const kw = response.data["evsemaxp"] / 1000;
        const h = response.data["TimeToFull"] / 3600;
        const kWh = kw * h;
        console.log(kWh);
        localStorage.setItem("kWh", kWh);
        navigate("/payment");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const navigateToPayment = () => {
    localStorage.setItem("kWh", inputValue);
    navigate("/payment");
  };

  return (
    <div className="animate__animated animate__fadeIn container ">
      <img
        className="logo2 d-flex justify-content-center mt-4"
        src={require("../Assets/img/logo.png")}
        alt=""
      />
      <h1 className={"d-flex justify-content-center "}>Input Value kWh</h1>

      <div className="paket container ">
        <div className="d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="inputUser text-center"
            value={inputValue}
          />
        </div>

        <div className="row ">
          <div className="col SimpleKeyboard">
            <div className="container ">
              <SimpleKeyboard
                layout={customLayout}
                onChange={handleInputChange}
                display={{
                  "{bksp}": "⌫",
                }}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-full " onClick={full}>
            Full Charging
          </button>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="row gx-5">
            <div className="col">
              <button className="btn btn-cancel" onClick={navigateToHome}>
                Cancel
              </button>
            </div>
            <div className="col">
              <button className="btn btn-process" onClick={navigateToPayment}>
                Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
