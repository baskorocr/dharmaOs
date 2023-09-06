import React,{useState,useEffect} from "react";
import '../Assets/index.css';
import { useNavigate } from "react-router-dom";
import { setSharedVariable } from '../state/action';
import axios from 'axios';
import { useDispatch } from "react-redux";
import controlEme from "./controlEme";

function App(){

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = 'http://10.20.27.100/api/webui/data'; // Assuming this API returns a single product
  const urlEvent = 'http://10.20.27.100/api/events/last';
  const [data, setData] = useState({ } );
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(null);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(null);
  const [isButtonDisabled3, setIsButtonDisabled3] = useState(true);
  const [plug, setPlug] = useState([]);
  const [error, setError] = useState(null);
  
 
  function plugCCS (){
    axios.get(urlEvent).
    then(response =>{
      const length = (response.data.length -1)

      if(response.data[length]['type'] === "session_start"){
      
        if(response.data[length]['outlet'] === "1"){
          setPlug(1);
          console.log("dsads");
          
        }
        else if(response.data[length]['outlet'] === "2"){
          setPlug(2);
        }
        else if(response.data[length]['outlet'] === "3"){
          setPlug(3);
        }
      }
      else{
        setPlug(0);
      }
    }).catch(err =>{
      console.log(err);
    })
  }
  
  
  useEffect(() => {
    let isMounted = true;
   
   
    const fetchData = async () => {
      //controlEme(navigate);
      plugCCS();

      try {
        axios.get(apiUrl)
          .then(response => {
            console.log(response.data['status']);
           
              if(response.data['status']['ccs'] && response.data['status']['ac'] && response.data['status']['chademo']){
                setIsButtonDisabled1(false);
                setIsButtonDisabled2(false);
                setIsButtonDisabled3(false);
               
              }
              else if(response.data['status']['ccs'] && response.data['status']['ac'] && response.data['status']['chademo'] === false){
                setIsButtonDisabled1(false);
                setIsButtonDisabled2(false);
                setIsButtonDisabled3(true);
              }
              else if(response.data['status']['ccs'] && response.data['status']['ac'] === false && response.data['status']['chademo']){
                setIsButtonDisabled1(false);
                setIsButtonDisabled2(true);
                setIsButtonDisabled3(false);
              }
              else if(response.data['status']['ccs'] === false && response.data['status']['ac'] && response.data['status']['chademo']){
                setIsButtonDisabled1(true);
                setIsButtonDisabled2(false);
                setIsButtonDisabled3(false);
              }
              else if(response.data['status']['ccs'] === false && response.data['status']['ac'] === false && response.data['status']['chademo'] === false){
                setIsButtonDisabled1(true);
                setIsButtonDisabled2(true);
                setIsButtonDisabled3(true);
              }
              
                const update = {
                  1: response.data['status']['ccs'],
                  2: response.data['status']['ac'],
                  3: response.data['status']['chademo']
                }

                setData(update);
              
              
 
              setTimeout(() => fetchData(),2000);
            // else if(response.data.length == 3){

            // }

          })
          .catch(error => {
            setError(error);
        
          });
          // Replace with your API endpoint
      
        
      } catch (err) {
        console.log(err)
        if (isMounted) {
          setError(err);
        }
      }
    };

    // Fetch data when the component mounts
    fetchData();

    return () => {
      isMounted = false; // Prevent state updates on unmounted component
    };
  }, []);


  if (error) {
    // If there's an error, redirect to the error page
    navigate("/error")
  }
 
 
  console.log(isButtonDisabled2);
 

  //set handle for onClick event
  const ClickButton1 = () =>{
    if(plug === 1){
      dispatch(setSharedVariable("1"));
      navigate("/powerup");
    }
    else{
      navigate("/cek");
    }
  }
  const ClickButton2 = () =>{
    if(plug === 2){
      dispatch(setSharedVariable("2"));
      navigate("/powerup");
    }
    else{
      navigate("/cek");
    }
  }
  const ClickButton3 = () =>{
    if(plug === 3){
      dispatch(setSharedVariable("2"));
      navigate("/powerup");
    }
    else{
      navigate("/cek");
    }
  }

  
  const btn = {
    
   margin: "auto",
    width: "260px",
    height: "380px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #ffffff",
    backgroundColor: "#337CCF"
  }
  const btn1Connect ={
    margin: "auto",
    width: "260px",
    height: "380px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #0c8542",
    backgroundColor: "#337CCF"
  }
  const btn2Connect ={
    margin: "auto",
    width: "260px",
    height: "380px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #0c8542",
    backgroundColor: "#337CCF"
  }
  const btn3Connect ={
    margin: "auto",
    width: "260px",
    height: "380px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #0c8542",
    backgroundColor: "#337CCF"
  }
 
  const notVailable ={
    margin: "auto",
    width: "260px",
    height: "380px",
    marginTop: "10%",
    borderRadius: "30px",
    border: "3px solid #ffffff",
    backgroundColor: "#000000a2"
  }
  
  

  

  return(
    
    <div className="animate__animated animate__fadeIn top ">

    <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Charging Station</h1>

        <div className={"row "}>
          <div className={"col-4"}>
            <button style={  data[1] === true  ? ( plug === 1 ? (btn1Connect):(btn)): (notVailable)} disabled={isButtonDisabled1} onClick={ClickButton1}>
              <div className={"number btn1"}>1</div>
              <br />
              <h3 className={"text"}>CCS</h3>
              <img src={require('../Assets/img/ccs.png')} className={"icon"} alt="" />
              {
                isButtonDisabled1 ? (
                  <p className={"code ccs"}>Not Available</p>
                ) : (
                  data === 1 ? (
                    <p className={"code ccs"}  >EV Connected</p>
                  ) : (
                    <p className={"code ccs"}>Available</p>
                  )
                )
              }
             

            </button>
          </div>
          <div className={"col-4"}>
          <button style={ 
            data[2] === true  ? (plug === 2 ? (btn2Connect):(btn)): (notVailable) } disabled={isButtonDisabled2} onClick={ClickButton2}>
          <div className={"number btn2"}>2</div>
              <br />
              <h3 className={"text"}>AC</h3>
              <img src={require('../Assets/img/type2.png')} className={"icon2"} alt="" />
              {
                isButtonDisabled2 ? (
                  <p className={"code type2"}>Not Available</p>
                ) : (
                  data === 2 ? (
                    <p className={"code type2"}>EV Connected</p>
                  ) : (
                    <p className={"code type2"}>Available</p>
                  )
                  
                )

                
              }
              


          </button>
          </div>
          <div className={"col-4"}>
          <button style={data[3] === true  ? (plug === 3 ? (btn3Connect):(btn)): (notVailable)} disabled={isButtonDisabled3} onClick={ClickButton3}>
          <div className={"number btn3"}>3</div>
              <br />
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

        {plug === 1 &&  <h2 className={"d-flex justify-content-center mt-4"}> CCS Has Been Connected </h2>}
        {plug === 2 && <h2 className={"d-flex justify-content-center mt-4"}> AC Has Been Connected</h2>}
        {plug === 0 && <h2 className={"d-flex justify-content-center mt-4"}> Please plug-in and select outlet to start</h2>}     
       
        
     
    
    </div>

  )
}

export default App;