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
  const apiUrl = '10.10.10.10'; // Assuming this API returns a single product
  const [data, setData] = useState([]);
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(false);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(false);
  const [isButtonDisabled3, setIsButtonDisabled3] = useState(false);
  
  
  function setButtonFalseTrue(){
    setIsButtonDisabled1(false);
    setIsButtonDisabled2(false);
    setIsButtonDisabled3(false);
   }
  
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
      setData(response.data);
      //real coding
      //setIs dipindah ke validasi outlite/mesin
      // if(response.data[0]['online'] == true){
      //   setIsButtonDisabled1(false);
      // }
      // elseif(response.data[0]['online'] == false)
      // {
      //   setIsButtonDisabled1(true);
      // }

      // elseif(response.data[1]['online'] == false){
      //   setIsButtonDisabled2(false);
      // }
      // elseif(response.data[1]['online'] == false)
      // {
      //   setIsButtonDisabled1(true);
      // }
      // elseif(response.data[2]['online'] == true){
      //   setIsButtonDisabled3(false);
      // }
      // elseif(response.data[2]['online'] == false)
      // {
      //   setIsButtonDisabled1(true);
      // }
     

      
      //sementara, harus dihapus
      setIsButtonDisabled1(false);
      setIsButtonDisabled2(false);
      setIsButtonDisabled3(false);
      
    })
    .catch(error => {
      console.log(error);
      setButtonFalseTrue();
    });
  }


 

  //set handle for onClick event
  const ClickButton1 = () =>{
    dispatch(setSharedVariable("1"));
    navigate("/dashboard")
  }
  const ClickButton2 = () =>{
    dispatch(setSharedVariable("2"));
    navigate("/dashboard")
  }
  const ClickButton3 = () =>{
    dispatch(setSharedVariable("3"));
    navigate("/dashboard")
  }

  //decision if all outlet can't connect
  if(isButtonDisabled1 === true && isButtonDisabled2 == true && isButtonDisabled3 == true){
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
          <button className={"btnEx"} disabled={isButtonDisabled2} onClick={ClickButton2}>
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
          <button className={"btnEx"} disabled={isButtonDisabled3} onClick={ClickButton3}>
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