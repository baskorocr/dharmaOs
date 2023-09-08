import React from "react";
import '../Assets/index.css';


function App(){

  return(
    
    <div className='animate__animated animate__fadeIn top'>

        <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />

        <h1 className={"d-flex justify-content-center mt-2"}>Outlet Not Detected</h1>
        <div className={"d-flex justify-content-center divError"}>
            <img src={require('../Assets/img/error.png')} className={"error"} alt="" />
        </div>
        <h1 className={"d-flex justify-content-center mt-2"}>Please check your machine</h1>
        
     
    
    </div>

  )
}

export default App;