import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";


function App(){
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const apiUrl = 'http://10.20.27.50:3001/state'; // Assuming this API returns a single product
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchData();
    // Fetch products immediately when the component mounts
    // Set up an interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  

  async function fetchData(){
    
    axios.get(apiUrl)
    .then(response => {
      //delete !.
      if(response.data['online'] == !false){
        navigate('error');
      }
      else{
        navigate('/home');
      }
      
    })
    .catch(error => {
      console.log(error);
      navigate('/error')
    });
  }
  





  return (
    <div className='animate__animated animate__fadeIn '>
      
      <img className={"logo"} src={require('../Assets/img/logo.png')} alt="" />
      
      <div className={"d-flex justify-content-center mt-4"}>
         <ReactLoading  className={'loading' } type={"spin"} color={"#ffffff"} height={'20%'} width={'20%'} />
      </div>
      <h1 className={"d-flex justify-content-center mt-5"}>Start the engine</h1>

      
    </div>
  );

}



 

export default App;
