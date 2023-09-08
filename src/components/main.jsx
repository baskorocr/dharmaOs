import React, { useState, useEffect} from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";


function Main(){
  const navigate = useNavigate();
  const apiUrl = 'http://10.20.27.100/'; // Assuming this API returns a single product
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch(apiUrl); // Replace with your API endpoint
        setData(true);
        setTimeout(() => fetchData(),1000);
        
      } catch (err) {
        setError(err);
        setTimeout(() => fetchData(),1000);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  if (data) {
    // If data is successfully fetched, redirect to the home page
    navigate("/home")
  }


  return (
    <div className='animate__animated animate__fadeIn top'>
      
      <img className={"logo"} src={require('../Assets/img/logo.png')} alt="" />
      
      <div className={"loading mt-4"}>
         <ReactLoading  className={'loading' } type={"spin"} color={"#ffffff"} height={'20%'} width={'20%'} />
      </div>
      <h1 className={"d-flex justify-content-center mt-5"}>Start the engine</h1>

      
    </div>
  );

}



 

export default Main;
