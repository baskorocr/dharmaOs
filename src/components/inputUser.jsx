import React, { useState, Component } from "react";
import "../Assets/index.css";
import "react-simple-keyboard/build/css/index.css";
import SimpleKeyboard from "react-simple-keyboard";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("myData");
  const parse = JSON.parse(storedData);
  const url = process.env.REACT_APP_API_URL2;

  const buttonNames = parse.kWh;
  const [inputValue, setInputValue] = useState("");
  const number = inputValue.toString().substring(4, 12);
  const user = localStorage.getItem("user");
  const extract = "usr" + number;

  const handleInputChange = (value) => {
    console.log(value);
    setInputValue(value);
  };

  const customLayout = {
    default: ["1 2 3", "4 5 6", "7 8 9", " 0 {bksp}"],
  };
  const keypad = {
    width: "50px",
  };

  const navigateToHome = () => {
    // Use the navigate function to navigate to the home route
    navigate("/home");
  };

  const navigateToPaket = () => {
    validationUser();
    //cek();
  };

  const validationUser = async () => {
    const postData = {
      idUser: extract,
    };
    console.log(postData);

    try {
      const resp = await axios.post(url + "/api/validationNomer", postData);
      console.log(resp.data.Message);
      if (resp.data.Message) {
        cek();
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Number Telp Can't Fount",
        text: "Check Your Number or Register!",
      });
    }
  };

  const cek = async () => {
    if (user == null) {
      localStorage.setItem("user", extract);
    } else {
      localStorage.removeItem("user");
      localStorage.setItem("user", extract);
    }

    const postData = {
      idMachine: process.env.REACT_APP_API_MCN,
      idUser: extract,
    };

    try {
      const resp = await axios.post(url + "/api/updateMachine", postData);
      console.log(resp);
      navigate("/paket");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn container ">
      <img
        className="logo2 d-flex justify-content-center mt-4"
        src={require("../Assets/img/logo.png")}
        alt=""
      />
      <h1 className={"d-flex justify-content-center "}>Input Number User</h1>

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
          <div className="row gx-5">
            <div className="col">
              <button className="btn btn-cancel" onClick={navigateToHome}>
                Cancel
              </button>
            </div>
            <div className="col">
              <button className="btn btn-process" onClick={navigateToPaket}>
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
