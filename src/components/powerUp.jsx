import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom/client';
import '../Assets/index.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";






function App(){
  const navigate = useNavigate();
  const sharedVariable = useSelector((state) => state.sharedVariable);
  //handler api
  const apiUrl = 'https://dummyjson.com/products/1';
 console.log(apiUrl);
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
      setStatus(response.data);
      
      navigate("/dashboard");
    })
    .catch(error => {
      setError(error);
  
    });
  }


  


  

  return(
    
    <div className='animate__animated animate__fadeIn '>

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