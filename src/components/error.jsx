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




  

  return(
    
    <div className='animate__animated animate__fadeIn'>

<img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Outlite Not Detected</h1>
        <div className={"d-flex justify-content-center"}>
            <img src={require('../Assets/img/error.png')} className={"error"} alt="" />
            

        </div>
        <h1 className={"d-flex justify-content-center mt-2"}>Please cek your machine</h1>
        
     
    
    </div>

  )
}

export default App;