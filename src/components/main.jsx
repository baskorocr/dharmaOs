import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";


function App(){
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const apiUrl = 'http://10.20.27.50:3001/swagger/'; // Assuming this API returns a single product
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Fetch products immediately when the component mounts

    // Set up an interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  

  async function fetchData(){
    
    try {
      const response = await axios.get(apiUrl);
      console.log(response.status);
      setProducts(prevProducts => [...prevProducts, response.data]);
      navigate("/home");
  
      // window.location = "/about";
    } catch (error) {
      setStatus('Error betwork');
      
    }
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
