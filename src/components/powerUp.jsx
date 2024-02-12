import React, { useState, useEffect } from "react";

import "../Assets/index.css";
import axios from "axios";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const sharedVariable = useSelector((state) => state.sharedVariable);

  const navigate = useNavigate();
  const [text, setText] = useState(["Please Wait"]);

  //http://10.20.27.100/api/outlets/'+sharedVariable+'/state

  const api =
    process.env.REACT_APP_API_URL + "/api/outlets/" + sharedVariable + "/state";

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 1000);
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handlePage, { passive: false });
    return () => {
      clearInterval(interval);
      window.removeEventListener("wheel", handlePage);
    };
  }, []);

  function fetchData() {
    console.log(text);
    axios
      .get(api)
      .then((Response) => {
        console.log(Response);
        if (Response.data["phs"] === 3) {
          setText("Parameters Discovery");
        } else if (Response.data["phs"] === 4) {
          setText("Checking Adaptor Connection");
        } else if (Response.data["phs"] === 5) {
          setText("Precharge Processing");
        } else if (Response.data["phs"] === 6) {
          setText("Starting  Charging");
          navigate("/dashboard");
        } else if (Response.data["phs"] === 7) {
          navigate("/dashboard");
        } else if (Response.data["phs"] === 1) {
          navigate("/cek");
        } else {
          setText("Please Wait For The Machine To Be Prepared ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="animate__animated animate__fadeIn top">
      <img
        className={"logo2 d-flex justify-content-center mt-4"}
        src={require("../Assets/img/logo.png")}
        alt=""
      />

      <h1 className={"d-flex justify-content-center mt-2"}>Power Up Machine</h1>
      <br />
      <div className={"d-flex justify-content-center"}>
        <img
          src={require("../Assets/img/powerUp.gif")}
          className={"powerUp"}
          alt=""
        />
      </div>
      <br />
      <h1 className={"d-flex justify-content-center mt-2"}>{text}</h1>
    </div>
  );
}

export default App;
