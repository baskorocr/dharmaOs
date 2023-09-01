import React,{useState,useEffect} from "react";
import '../Assets/index.css';
import axios from 'axios';

import { useNavigate } from "react-router-dom";





function App(){

  const navigate = useNavigate();
  //handler api
  const apiUrl = 'http://10.20.27.50:3001/state';
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);


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


  const fetchApi = async () =>{
    axios.get(apiUrl)
    .then(response => {
      //masih dummy response. butuh validation
      //ketika outlite true;
   
      

    })
    .catch(error => {
      setError(error);
  
    });
  }


  return(
    
    <div className='animate__animated animate__fadeIn '>

        <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Outlite Not Detected</h1>
        <div className={"d-flex justify-content-center divError"}>
            <img src={require('../Assets/img/error.png')} className={"error"} alt="" />
        </div>
        <h1 className={"d-flex justify-content-center mt-2"}>Please cek your machine</h1>
        
     
    
    </div>

  )
}

export default App;