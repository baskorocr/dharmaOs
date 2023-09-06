import React,{useState,useEffect} from "react";
import '../Assets/index.css';
import axios from 'axios';

import { useNavigate } from "react-router-dom";





function App(){

  const navigate = useNavigate();
  //handler api
  const apiUrl = 'http://10.20.27.100/api/system/iostate';

  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
   
   
    const fetchData = async () => {
    

      try {
        axios.get(apiUrl)
          .then(response => {

          
          
           if(response.data['io'][48]['value'] !== 0){
            navigate('/home');
           }
           else{
            setTimeout(() => fetchData(),1000);
           }
          
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
 

  return(
    
    <div className='animate__animated animate__fadeIn '>

        <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Turn Left Button</h1>
        <div className={"d-flex justify-content-center divError"}>
            <img src={require('../Assets/img/error.png')} className={"error"} alt="" />
        </div>
        <h1 className={"d-flex justify-content-center mt-2"}>To Stop Emergency Mode</h1>
        
     
    
    </div>

  )
}

export default App;