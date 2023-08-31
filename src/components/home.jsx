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
  const apiUrl = 'http://10.20.27.50:3001/state'; // Assuming this API returns a single product
  const [data, setData] = useState([]);
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(true);
  const [isButtonDisabled3, setIsButtonDisabled3] = useState(true);

  
  useEffect(() => {
    // Fetch products immediately when the component mounts
    fetchData();

    // Set up an interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchData, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


   async function fetchData(){
    
    axios.get(apiUrl)
    .then(response => {
   
      if(response.data['online']==false){
        setIsButtonDisabled1(false);
        setIsButtonDisabled2(true);
        setIsButtonDisabled3(true);
      }
      
    })
    .catch(error => {
      console.log(error);
      navigate('/error')
    });
    
  }



 

  //set handle for onClick event
  const ClickButton1 = () =>{
    dispatch(setSharedVariable("1"));
    navigate("/powerup")
  }
  const ClickButton2 = () =>{
    dispatch(setSharedVariable("2"));
    navigate("/powerup")
  }
  const ClickButton3 = () =>{
    dispatch(setSharedVariable("3"));
    navigate("/powerup")
  }

  //decision if all outlet can't connect
  if(isButtonDisabled1 === true && isButtonDisabled2 == true && isButtonDisabled3 == true){
    navigate("/error")
  }

  
  

  

  return(
    
    <div className="animate__animated animate__fadeIn ">

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
                  <p className={"code ccs"}>Not Available</p>
                ) : (
                  <p className={"code ccs"}>Available</p>
                )
              }
             

            </button>
          </div>
          <div className={"col-4"}>
          <button className={"btnEx"} disabled={isButtonDisabled2} onClick={ClickButton2}>
          <div className={"number btn2"}>2</div>
              <br /><br /><br />
              <h3 className={"text"}>AC</h3>
              <img src={require('../Assets/img/type2.png')} className={"icon2"} alt="" />
              {
                isButtonDisabled2 ? (
                  <p className={"code type2"}>Not Available</p>
                ) : (
                  <p className={"code type2"}> Available</p>
                )
              }


          </button>
          </div>
          <div className={"col-4"}>
          <button className={"btnEx"} disabled={isButtonDisabled3} onClick={ClickButton3}>
          <div className={"number btn3"}>3</div>
              <br /><br /><br />
              <h3 className={"text"}>CHAdeMO</h3>
              <img src={require('../Assets/img/chademo.png')} className={"icon3"} alt="" />
              {
                isButtonDisabled3 ? (
                  <p className={"code chademo"}>Not Available</p>
                ) : (
                  <p className={"code chademo"}> Available</p>
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