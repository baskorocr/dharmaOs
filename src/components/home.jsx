import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";

function IntervalApiFetch() {
  const [products, setProducts] = useState([]);
  const apiUrl = 'https://10.27.20.50:3001'; // Assuming this API returns a single product
  const [status, setStatus] = useState(null);
  var i = 0;

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(apiUrl);
      console.log(response.status);
      setProducts(prevProducts => [...prevProducts, response.data]);
      setStatus(null);

     


      // window.location = "/about";
    } catch (error) {
      setStatus('Error betwork');
      navigate("/main");
    }
  };

  
  useEffect(() => {
    // Fetch products immediately when the component mounts
    fetchProducts();

    
    // Set up an interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchProducts, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  



  return (
    <div className='animate__animated animate__fadeIn'>
      
      <img className={"logo"} src={require('../Assets/img/logo.png')} alt="" />
      
      <div className={"d-flex justify-content-center mt-4"}>
         <ReactLoading  className={'loading' } type={"spin"} color={"#ffffff"} height={'20%'} width={'20%'} />
      </div>
      <h2 className={"d-flex justify-content-center mt-5"}>Start the engine</h2>

      
    </div>
  );
}

export default IntervalApiFetch;
