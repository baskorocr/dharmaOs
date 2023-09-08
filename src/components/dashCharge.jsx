import React,{useState,useEffect} from "react";

import '../Assets/index.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import socketIO from 'socket.io-client';
import { useSelector } from 'react-redux';


function App(){
  const navigate = useNavigate();
  const sharedVariable = useSelector((state) => state.sharedVariable);
  
  
  //handler api
  const apiUrl = 'ws://10.20.27.100/api/outlets/'+sharedVariable+'/statestream';


  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  

 
  useEffect(() => {
    const socket = new WebSocket(apiUrl);

    // WebSocket event handlers
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      console.log(event.data);
      const jsonData = JSON.parse(event.data);
      setData(jsonData);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
      } else {
        console.error('Connection abruptly closed');
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

 
  //set handle for onClick event
  const backHome1 = () =>{
    stopCharge();
  }

  function stopCharge(){
    
    axios.post('http://10.20.27.100/api/outlets/ac/coap/stop')
    .then(response => {
      console.log(response.status);
      if(response.status === 200){
        console.log("dasds");
        navigate("/home");
      }
  
    }).catch(err =>{
        navigate('/error');
        console.log(err);
    })
  }
  
  const val = 50
   
  const style1 = {
    borderRadius: '5px',
    height:"30px",
    backgroundColor: "#d9d9d9",
    marginTop : '1%',
    width: '708px',

    
  }
  const style2 = {
    borderRadius: '5px',
    height:"30px",
    backgroundColor: "#0c8542",
    width: data["EVRESSSOC"]+'%',
  }

  console.log(apiUrl);

  return(
    
    <div className='animate__animated animate__fadeIn top'>

        <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />
        <h1 className={"d-flex justify-content-center mt-2"}>Dashboard Monitoring</h1>
        <div className={"mt-3 ps-2 pt-4"} id={"customCard"}>     
            
                <div className={"row pt-6 ps-5 pe-3"}>
                    <div className={"col-8 "}>
                       <h4 className={"status"}>Battery Status</h4>
                    </div>
                    <div className={"col-2 "}>
                        <h4 className={"status"}>0%</h4>
                    </div>
                    <div className="col-2">
                    <img className={"iconBt"}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAYlJREFUWEftlkFOhDAUht+ruhoWHgFPIhDvMfEYSsw4MegxxrmHATyJHMEF7rTPtBlMpzNMXxESFmVHSvu+/v3fTxFm9uDMeCAAuU4kKBQUcingGp+/h6IieySAJQLErt34jhNAgwDbcyFfP+/q5tj8PYUUDACsfAt13+8KcjaybvNS1Tp4bCAaCgNSpHD2swLChLNGm5dH7fJvIK2KFLftw1sdFRl7Q9MAIdXtfZUqRaKnmwSErDjqqG/GBzJgNJCn/8YGOjBl9JxWXP/YKppw/h6SIlV+sRfVCiFdE2HsGxmDgEzzunyi/ERCLgEg4cANAtIQSDUQvp8KNhOWe4zDgcxqSDURNhdCru3U3Sm04ahjd5y/h6zzsrvFt9vGBvrrtsuXJP4m3HA7bey21zp1i/qG4jTBCKDV4Rr3VPbsWdN8WRTZB8eIXQSQkGzjmnXU/K+8vOL87VnXD49rRl9k8a4favaiyDbcQHMFZM94L4yOuoGLTjYtALmkDQoFhVwKuMaDh1wK/QIx/L4lTEFnYAAAAABJRU5ErkJggg=="/>
                    
                    </div>
                </div>

                <div className={" ms-5 me-5 d-flex  mb-3 "} style={style1} >
                    <div className="" style={style2} ></div>
                </div>
               
                <div className={"line"}></div>


                <div className={"container mt-4  styleD pe-5"}>
                    <div className={"row"}>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Volt | Ampere
                            </div>
                            <div className={"col-md-6 val"}>
                            {data['pv']} V | {data['pc'] } A
                            </div>
                            </div>

                    </div>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Max kW
                            </div>
                            <div className={"col-md-6 val"}>
                              {(data["evsemaxp"]/1000)} 
                            </div>
                            </div>
                    </div>
                    </div>
                    
                    
                </div>



                <div className={"container mt-2  styleD pe-5"}>
                    <div className={"row"}>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Current Time
                            </div>
                            <div className={"col-md-6 val"}>
                              {data["curr_ses_secs"]} S
                            </div>
                            </div>

                    </div>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Current kWh
                            </div>
                            <div className={"col-md-6 val"}>
                            {((data["curr_ses_Wh"])/1000) === NaN ? ("") : ((data["curr_ses_Wh"])/1000) }
                            </div>
                            </div>
                    </div>
                    </div>
                    
                    
                </div>



                <div className={"container mt-2 styleD pe-5 "}>
                    <div className={"row"}>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Estimate
                            </div>
                            <div className={"col-md-6 val"}>
                            {data["TimeToFull"]/60} Minute
                            </div>
                            </div>

                    </div>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Channel
                            </div>
                            <div className={"col-md-6 val"}>
                            {sharedVariable === "ccs" && 1
                            }
                            {sharedVariable === "ac" && 2
                            }
                            {sharedVariable === "chademo" && 3
                            }

                            </div>
                            </div>
                    </div>
                    </div>
                    
                    
                </div>

                <div className="d-flex justify-content-center mb-3"> 
                        <button onClick={backHome1} id="btnFinis" className=" d-flex-justify-content-center">
                            

                            <div className="row">

                            <div className={"col-4 t "} id={"homeImg"}>
                            <img className="d-flex justify-content-right" alt="cek" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAX5JREFUWEft2GtugzAMAOBYMfdobzJusp5k7Um2m4ybjHvUyFOyhgaIyatIaIK/OOSrk9hRQe3sgZ151P8DMfNJDcOnzbTWFwDoa7JelaEH5scD9ErrtgZVDApgnKsKVQQKZuaPc3qoilHZoCCG+aIQezUM37WoLJCEgabpTGYe76tQyaAYxm2gWlQSKBXzClQUlIupRa2CSjE1KBFUiylFBUGvwpSgFqBgBWZu3dEu7VOpbWYCktoBIEY3fwqUiXgWt6joUxCRaZSu/I9jNwSZOXpAPLvJdg4ydxuid6sF+BjVgSVjE2fiw09netv8GjJZMuabHYr45cfJx95bb3/JVq4dS5rWZ38yHyRtg3wQkWmebymbWCnVAWI7Hn/hR/rfKgE9T4pL+1wnLPdWGRpBUtqliQ9QbK8cGToyZC/yCbVkq1MWbLSJBTEWNmmoaYXxfr/6/Sw2Q9Z75hs0zTU0Zv1OTWT+RDBtQmqiWQ4bvIKxPT3/i9uOOECx/P4CDROgNG2o86UAAAAASUVORK5CYII="/>
                            </div>
                            <div className={"col-8"}>
                            <h5 className={"back"} id={"back"}>Back To Home</h5>
                            </div>
            
                            </div>
                        </button>


                        
                </div>

        </div>


       
     
    
    </div>

  )
}

export default App;