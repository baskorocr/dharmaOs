import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom/client';
import '../Assets/index.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { setSharedVariable } from '../state/action';

import { useDispatch } from "react-redux";


function App(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = 'https://enappd.com/'; // Assuming this API returns a single product
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(false);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(false);
  const [isButtonDisabled3, setIsButtonDisabled3] = useState(false);
  useEffect(() => {
    // Fetch products immediately when the component mounts
    fetchData();

    // Set up an interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchData, 2000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

   async function fetchData(){
    
    axios.get(apiUrl)
    .then(response => {
      setData(response.status);
      //setIs dipindah ke validasi outlite/mesin
      setIsButtonDisabled1(true);
      setIsButtonDisabled2(false);
      setIsButtonDisabled3(false);
    })
    .catch(error => {
      console.log(error);
      setIsButtonDisabled1(false);
      setIsButtonDisabled2(true);
      setIsButtonDisabled3(true);
    });
  }


  //set handle for onClick event
  const ClickButton1 = () =>{
    dispatch(setSharedVariable("1"));
    navigate("/dashboard")
  }

  if(isButtonDisabled1 == true && isButtonDisabled2 == true && isButtonDisabled3 == true){
    navigate("/error")
  }

  

  

  return(
    
    <div className="animate__animated animate__fadeIn">

    <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Charger Station</h1>

        <div className={"row "}>
          <div className={"col-4"}>
            <button className={"btnEx"} disabled={isButtonDisabled1} onClick={ClickButton1}>
              <div className={"number"}>1</div>
              <br /><br /><br />
              <h3 className={"text"}>CSS</h3>
              <img src={require('../Assets/img/ccs.png')} className={"icon"} alt="" />
              {
                isButtonDisabled1 ? (
                  <p className={"code ccs"}>Not Avilable</p>
                ) : (
                  <p className={"code ccs"}>Avilable</p>
                )
              }
             

            </button>
          </div>
          <div className={"col-4"}>
          <button className={"btnEx"} disabled={isButtonDisabled2}>
          <div className={"number btn2"}>2</div>
              <br /><br /><br />
              <h3 className={"text"}>AC</h3>
              <img src={require('../Assets/img/type2.png')} className={"icon2"} alt="" />
              {
                isButtonDisabled2 ? (
                  <p className={"code type2"}>Not Avilable</p>
                ) : (
                  <p className={"code type2"}> Avilable</p>
                )
              }


          </button>
          </div>
          <div className={"col-4"}>
          <button className={"btnEx"} disabled={isButtonDisabled3}>
          <div className={"number btn3"}>3</div>
              <br /><br /><br />
              <h3 className={"text"}>CHAdeMO</h3>
              <img src={require('../Assets/img/chademo.png')} className={"icon3"} alt="" />
              {
                isButtonDisabled3 ? (
                  <p className={"code chademo"}>Not Avilable</p>
                ) : (
                  <p className={"code chademo"}> Avilable</p>
                )
              }


          </button>
          </div>

          
      
        </div>

        <h2 className={"d-flex justify-content-center mt-4"}> Please plug-in and select outlet to start</h2>
        
     
    
    </div>

  )
}

export default App;