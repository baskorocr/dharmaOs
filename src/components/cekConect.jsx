import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom/client';
import '../Assets/index.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





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
  const backHome1 = () =>{
    window.location = "/main";
  }

  

  return(
    
    <div>

<img className={"logo2 d-flex justify-content-center mt-3"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Please Plug Connector Charging</h1>
        <div className={"d-flex justify-content-center"}>
            <img src={require('../Assets/img/cek.gif')} className={"gif"} alt="" />
            

        </div>
        <div className={"d-flex justify-content-center"}>

        <button onClick={backHome1} className="btnHome">
        <div className="row">
            <div className="col-1">
            <img className={"home mt-1 ms-2"} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAX5JREFUWEft2GtugzAMAOBYMfdobzJusp5k7Um2m4ybjHvUyFOyhgaIyatIaIK/OOSrk9hRQe3sgZ151P8DMfNJDcOnzbTWFwDoa7JelaEH5scD9ErrtgZVDApgnKsKVQQKZuaPc3qoilHZoCCG+aIQezUM37WoLJCEgabpTGYe76tQyaAYxm2gWlQSKBXzClQUlIupRa2CSjE1KBFUiylFBUGvwpSgFqBgBWZu3dEu7VOpbWYCktoBIEY3fwqUiXgWt6joUxCRaZSu/I9jNwSZOXpAPLvJdg4ydxuid6sF+BjVgSVjE2fiw09netv8GjJZMuabHYr45cfJx95bb3/JVq4dS5rWZ38yHyRtg3wQkWmebymbWCnVAWI7Hn/hR/rfKgE9T4pL+1wnLPdWGRpBUtqliQ9QbK8cGToyZC/yCbVkq1MWbLSJBTEWNmmoaYXxfr/6/Sw2Q9Z75hs0zTU0Zv1OTWT+RDBtQmqiWQ4bvIKxPT3/i9uOOECx/P4CDROgNG2o86UAAAAASUVORK5CYII="/>
            </div>
            <div className="col">
            <h5 className={"back"}>Back To Home</h5>
            </div>
            </div>
        </button>

        
        </div>
        
     
    
    </div>

  )
}

export default App;