import React from "react";
import "../Assets/index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const storedData = localStorage.getItem("myData");
  const parse = JSON.parse(storedData);
  console.log();
  const buttonNames = parse.kWh;

  const handleButtonClick = (id) => {
    // Handle button click based on id or other conditions
    console.log(id);
    const a = Math.round((id * 1000) / (380 * 1.73 * 0.85));
    localStorage.setItem("kWh", id);
    const postData = {
      ccs: {
        circuitControl: true,
        num_of_modules: 4,
        extcc: {},
        stack: {
          evseId: "FR*A23*E45B*69C",
          imd: "bender",
          maxKW: id,
          maxA: a,
        },
        intcc: {
          conv: "uugp",
          dcbrk: false,
          acbrk: false,
          iso: false,
          extVolt: "sim",
        },
      },
      chademo: {
        circuitControl: true,
        extcc: {
          proto: "sim",
          ip: "10.20.17.10",
          port: 630,
        },
        intcc: {
          conv: "uugp",
          dcbrk: false,
          acbrk: false,
          iso: false,
          extVolt: "sim",
        },
        stack: {
          v2h: true,
          dyn: true,
        },
      },
      ac: {
        circuitControl: true,
        extcc: {
          proto: "modbus",
          ip: "10.20.17.10",
          port: 620,
        },
        stack: {
          modBus: false,
          lifeBeat: false,
          seccLock: true,
          maxCurrent: 16,
          relayGpio: 466,
          relaySense: false,
          relaySenseGpio: 471,
          lockCloseGpio: 506,
          lockOpenGpio: 507,
          lockSense: true,
          lockSenseFile: "/sys/bus/iio/devices/iio:device0/in_voltage7_raw",
          lockSenseTresh: 1900,
          proxReading: true,
          proxFile: "/sys/bus/iio/devices/iio:device0/in_voltage4_raw",
          estops: [81],
        },
      },
    };

    const apiUrl = "http://10.20.27.100/api/system/userconfig";

    // Make the POST request using Axios
    axios
      .post(apiUrl, postData, {
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
      })
      .then((response) => {
        // Handle the response data
        if (response.status === 200) {
          navigate("/payment");
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error during POST:", error);
      });
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="animate__animated animate__fadeIn container ">
      <img
        className="logo2 d-flex justify-content-center mt-4"
        src={require("../Assets/img/logo.png")}
        alt=""
      />
      <h1 className={"d-flex justify-content-center "}>
        Select Charging Package
      </h1>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
      </div>

      <div className="paket container ">
        <div className="row gx-3 justify-content-center">
          {buttonNames.map((buttonName, index) => (
            <div key={index} className="col-6 col-3">
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-custom2"
                  id={buttonName}
                  onClick={() => handleButtonClick(buttonName)}
                >
                  <i className="bx bxs-ev-station bx-md"> {buttonName} kWh</i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col mb-5">
            <div className="d-flex justify-content-center">
              <button className="btn btn-cancelPaket " onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
