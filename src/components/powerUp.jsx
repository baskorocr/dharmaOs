import React,{useState,useEffect} from "react";

import '../Assets/index.css';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";






function  App(){
  
  const sharedVariable = useSelector((state) => state.sharedVariable);
 
  const navigate = useNavigate();

  console.log(sharedVariable);


  const api = 'http://10.20.27.100/api/outlets/'+sharedVariable+'/state';
  setTimeout(2000);


  useEffect(() => {
    // Delay for 2 seconds (2000 milliseconds)
    const delay = 3000;

    const timer = setTimeout(() => {
      axios.get(api).then(
        Response => {
          console.log(Response.data);
          if(Response.data['phs'] === 7){
            console.log("dsads");
            navigate('/dashboard');
          }
          else{
            navigate('/cek');
          }
        }
      ).catch(err => 
        {
          console.log(err);
        })
      console.log('Delayed code executed after 2 seconds');
    }, delay);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  
   

  return(
    
    <div className='animate__animated animate__fadeIn top'>

        <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Power Up Machine</h1>
        <div className={"d-flex justify-content-center"}>
            <img src={require('../Assets/img/powerUp.gif')} className={"powerUp"} alt="" />
            

        </div>
        <h1 className={"d-flex justify-content-center mt-2"}>Checking adaptor connection</h1>
        
     
    
    </div>

  )
}

export default App;