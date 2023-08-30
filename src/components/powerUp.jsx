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


  

  return(
    
    <div className='animate__animated animate__fadeIn'>

<img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Power Up Machine</h1>
        <div className={"d-flex justify-content-center"}>
            <img src={require('../Assets/img/powerUp.gif')} className={"powerUp"} alt="" />
            

        </div>
        <h1 className={"d-flex justify-content-center mt-2"}>Checking adaptor connecting</h1>
        
     
    
    </div>

  )
}

export default App;