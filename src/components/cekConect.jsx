import React, { useEffect } from "react";
import "../Assets/index.css";
import { useNavigate } from "react-router-dom";
import controlEme from "./controlEme";
import { useSelector } from "react-redux";
import axios from "axios";

function App() {
  const navigate = useNavigate();

  const sharedVariable = useSelector((state) => state.sharedVariable);
  //http://10.20.27.100/api/outlets/'+sharedVariable+'/state
  const api =
    process.env.REACT_APP_API_URL + "/api/outlets/" + sharedVariable + "/state";
  console.log(api);

  useEffect(() => {
    redirect();

    const interval = setInterval(redirect, 1000);
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

  function redirect() {
    controlEme(navigate, sharedVariable);
    axios
      .get(api)
      .then((Response) => {
        console.log(Response);
        if (Response.data["phs"] === 2) {
          navigate("/inputUser");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // function Auth(){
  //   const data = {
  //     "plug_type": sharedVariable,
  //     "auth": true,
  //     "user": "user0815"
  //   }
  //   axios.post(process.env.REACT_APP_API_URL+'/api/outlets/'+sharedVariable+'/coap/auth', data)
  //   .then(response => {

  //     if(response.status === 200){

  //       navigate("/powerup");

  //     }

  //   }).catch(err =>{
  //       navigate('/error');
  //       console.log(err);
  //   })
  // }

  //set handle for onClick event
  const backHome1 = () => {
    navigate("/home");
  };

  return (
    <div className="animate__animated animate__fadeIn  top">
      <img
        className={"logo2 d-flex justify-content-center mt-4"}
        src={require("../Assets/img/logo.png")}
        alt=""
      />

      <h1 className={"d-flex justify-content-center mt-2"}>
        Please Plug Connector Charging
      </h1>
      <div className={"d-flex justify-content-center"}>
        <img src={require("../Assets/img/cek.gif")} className={"gif"} alt="" />
      </div>
      <div className={"d-flex justify-content-center"}>
        <button onClick={backHome1} className="btnHome">
          <div className="row">
            <div className={"col-2"} id={"cekImg"}>
              <img
                className={"imgCek"}
                alt="cek"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAX5JREFUWEft2GtugzAMAOBYMfdobzJusp5k7Um2m4ybjHvUyFOyhgaIyatIaIK/OOSrk9hRQe3sgZ151P8DMfNJDcOnzbTWFwDoa7JelaEH5scD9ErrtgZVDApgnKsKVQQKZuaPc3qoilHZoCCG+aIQezUM37WoLJCEgabpTGYe76tQyaAYxm2gWlQSKBXzClQUlIupRa2CSjE1KBFUiylFBUGvwpSgFqBgBWZu3dEu7VOpbWYCktoBIEY3fwqUiXgWt6joUxCRaZSu/I9jNwSZOXpAPLvJdg4ydxuid6sF+BjVgSVjE2fiw09netv8GjJZMuabHYr45cfJx95bb3/JVq4dS5rWZ38yHyRtg3wQkWmebymbWCnVAWI7Hn/hR/rfKgE9T4pL+1wnLPdWGRpBUtqliQ9QbK8cGToyZC/yCbVkq1MWbLSJBTEWNmmoaYXxfr/6/Sw2Q9Z75hs0zTU0Zv1OTWT+RDBtQmqiWQ4bvIKxPT3/i9uOOECx/P4CDROgNG2o86UAAAAASUVORK5CYII="
              />
            </div>
            <div className={"col-8"}>
              <h5 className={"back"}>Back To Home</h5>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;
