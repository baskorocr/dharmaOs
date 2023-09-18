import React,{useEffect} from "react";
import '../Assets/index.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function App(){

  const navigate = useNavigate();
  //handler api
  const sharedVariable = useSelector((state) => state.sharedVariable);

  

  useEffect(() => {

    fetchData();
    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }};
    window.addEventListener('wheel', handlePage, { passive: false });
    const interval = setInterval(fetchData, 1000);
    return () => {clearInterval(interval);window.removeEventListener('wheel', handlePage);};

    
  }, []);

  function fetchData(){
    if(sharedVariable === '' || sharedVariable === 'ac'){
      defaultGetEme();
    }
    else if(sharedVariable === 'ccs' ){
      OutletEme();
    }
  }

  function defaultGetEme(){
    const apiUrl = 'http://10.20.27.100/api/system/iostate'; // Assuming this API returns a single product
    axios.get(apiUrl)
    .then(response => {
      
       if(response.data['io'][49]['value'] === 1){
        navigate("/home");
       }
     
    }).catch(error => {
      navigate('/error');
    })

    }
    
    function OutletEme(){
      const apiUrl = 'http://10.20.27.100/api/outlets/'+sharedVariable+'/state'; // Assuming this API returns a single product
          axios.get(apiUrl)
          .then(response => {
             if(response.data['evsestat'] === 1){
              navigate("/home");
             }

          }).catch(error => {
            navigate('/error');
          })
    }

  return(
    
    <div className='animate__animated animate__fadeIn top'>

        <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Turn Left Button</h1>
     
        <div className={"d-flex justify-content-center divError"}>
            <img src={require('../Assets/img/error.png')}  className={"  error"} alt="" />
        </div>
       
        <h1 className={"d-flex justify-content-center mt-2"}>To Stop Emergency Mode</h1>

    </div>

  )
}

export default App;