import React,{useState,useEffect} from "react";
import '../Assets/index.css';
import { useNavigate } from "react-router-dom";
import { setSharedVariable } from '../state/action';
import axios from 'axios';
import { useDispatch } from "react-redux";



function App(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = 'http://10.20.27.50:3001/state'; // Assuming this API returns a single product
  const [data, setData] = useState([]);
  const [isButtonDisabled1, setIsButtonDisabled1] = useState(true);
  const [isButtonDisabled2, setIsButtonDisabled2] = useState(true);
  const [isButtonDisabled3, setIsButtonDisabled3] = useState(true);

  const [error, setError] = useState(null);
  
 

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        axios.get(apiUrl)
          .then(response => {
           
            if(response.data.length == 2){
              
              if(response.data[0]['online'] && response.data[1]['online']){
                setIsButtonDisabled1(false);
                setIsButtonDisabled2(false);
                setIsButtonDisabled3(true);
              }
              else if(response.data[0]['online'] === true && response.data[1]['online'] === false){
                setIsButtonDisabled1(false);
                setIsButtonDisabled2(true);
                setIsButtonDisabled3(true);
              }
              else if(response.data[0]['online'] === false && response.data[1]['online'] === true){
                setIsButtonDisabled1(true);
                setIsButtonDisabled2(false);
                setIsButtonDisabled3(true);
              }
              else if(response.data[0]['online'] === false && response.data[1]['online'] === false){
                setIsButtonDisabled1(true);
                setIsButtonDisabled2(true);
                setIsButtonDisabled3(true);
                navigate("/error");
              }
            }
            if(response.data[0]['testEV'] === true){
              setData(1);
            }
            else if(response.data[1]['testEV'] === true){
              setData(2);
            }
            else if(response.data[1]['testEV'] === false || response.data[0]['testEV'] === false){
              setData(4);

            }

            // else if(response.data.length == 3){

            // }

          })
          .catch(error => {
            setError(error);
        
          });
          // Replace with your API endpoint
      
        setTimeout(() => fetchData(),5000);
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
  


 

  //set handle for onClick event
  const ClickButton1 = () =>{
    if(data === 1){
      dispatch(setSharedVariable("1"));
      navigate("/powerup");
    }
    else{
      navigate("/cek");
    }
  }
  const ClickButton2 = () =>{
    if(data === 2){
      dispatch(setSharedVariable("2"));
      navigate("/powerup");
    }
    else{
      navigate("/cek");
    }
  }
  const ClickButton3 = () =>{
    dispatch(setSharedVariable("3"));
    navigate("/powerup")
  }

  
  const btn = {
    margin: "auto",
    width: "200px",
    height: "300px",
    marginTop: "30%",
    borderRadius: "30px",
    border: "3px solid #ffffff",
    backgroundColor: "#337CCF"
  }
  const btn1Connect ={
    margin: "auto",
    width: "200px",
    height: "300px",
    marginTop: "30%",
    borderRadius: "30px",
    border: "3px solid #0c8542",
    backgroundColor: "#337CCF"
  }
  const btn2Connect ={
    margin: "auto",
    width: "200px",
    height: "300px",
    marginTop: "30%",
    borderRadius: "30px",
    border: "3px solid #0c8542",
    backgroundColor: "#337CCF"
  }
  
  

  

  return(
    
    <div className="animate__animated animate__fadeIn ">

    <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Charger Station</h1>

        <div className={"row "}>
          <div className={"col-4"}>
            <button style={ data === 1 ? (btn1Connect): (btn)} disabled={isButtonDisabled1} onClick={ClickButton1}>
              <div className={"number"}>1</div>
              <br /><br /><br />
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
          <button style={ data === 2 ? (btn2Connect): (btn)} disabled={isButtonDisabled2} onClick={ClickButton2}>
          <div className={"number btn2"}>2</div>
              <br /><br /><br />
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

        {data === 1 &&  <h2 className={"d-flex justify-content-center mt-4"}> CCS Has Been Connected </h2>}
        {data === 2 && <h2 className={"d-flex justify-content-center mt-4"}> AC Has Been Connected</h2>}
        {data === 4 && <h2 className={"d-flex justify-content-center mt-4"}> Please plug-in and select outlet to start</h2>}     
       
        
     
    
    </div>

  )
}

export default App;