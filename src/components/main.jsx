import axios from 'axios';
import React, { useEffect} from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";



function Main(){
  ''
  const navigate = useNavigate();
  //https://dummyjson.com/products/1
  const apiUrl = 'http://10.20.27.100/'; // Assuming this API returns a single product

 

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }};
    window.removeEventListener('wheel', handlePage);
    return () => {clearInterval(interval); window.removeEventListener('wheel', handlePage);};
   
  }, []);

  function fetchData(){
    axios.get(apiUrl).then(Response => {

      if(Response.status === 200){
        console.log(Response.data);
        navigate("/home");
      }
    }).catch(error =>{
      console.log(error);
    })
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
