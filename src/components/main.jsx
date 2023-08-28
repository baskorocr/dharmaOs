import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom/client';
import '../Assets/index.css';
import axios from 'axios';





function App(){

  //handler api
  const apiUrl = 'https://10.27.20.50:3001';
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const fetchApi = async () =>{
    axios.get(apiUrl)
    .then(response => {
      setStatus(response.data);
      

    })
    .catch(error => {
      setError(error);
  
    });
  }


  //set background handling
  useEffect(() => {
    // Fetch products immediately when the component mounts
    fetchApi();
   
    
    // Set up an interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchApi, 2000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

 

  //set state for button on/off
  var button1,button2,button3;


  //set handle for onClick event
  const ClickButton1 = () =>{
   console.log("dsadsa")
  }

  

  return(
    
    <div>

<img className={"logo2 d-flex justify-content-center mt-3"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Charger Station</h1>

        <div className={"row "}>
          <div className={"col-4"}>
            <button className={"btnEx"} disabled={button1} onClick={ClickButton1}>
              <div className={"number"}>1</div>
              <br /><br /><br />
              <h3 className={"text"}>CSS</h3>
              <img src={require('../Assets/img/ccs.png')} className={"icon"} alt="" />
              {
                button1 ? (
                  <p className={"code ccs"}>Not Avilable</p>
                ) : (
                  <p className={"code ccs"}> Avilable</p>
                )
              }
             

            </button>
          </div>
          <div className={"col-4"}>
          <button className={"btnEx"} disabled={button2}>
          <div className={"number btn2"}>2</div>
              <br /><br /><br />
              <h3 className={"text"}>AC</h3>
              <img src={require('../Assets/img/type2.png')} className={"icon2"} alt="" />
              {
                button2 ? (
                  <p className={"code type2"}>Not Avilable</p>
                ) : (
                  <p className={"code type2"}> Avilable</p>
                )
              }


          </button>
          </div>
          <div className={"col-4"}>
          <button className={"btnEx"} disabled={button3}>
          <div className={"number btn3"}>3</div>
              <br /><br /><br />
              <h3 className={"text"}>CHAdeMO</h3>
              <img src={require('../Assets/img/chademo.png')} className={"icon3"} alt="" />
              {
                button3 ? (
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