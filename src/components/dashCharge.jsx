import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom/client';
import '../Assets/index.css';
import axios from 'axios';

import { useSelector } from 'react-redux';


function App(){
  const sharedVariable = useSelector((state) => state.sharedVariable);
  console.log(sharedVariable);
  //handler api
  const apiUrl = 'https://10.27.20.50:3001';
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const fetchApi = async () =>{
    axios.get(apiUrl)
    .then(response => {
      setStatus(response.data);
      

    })
    .catch(error => {
      setError(error);
  
    });
  }


  //set background handling
  useEffect(() => {
    // Fetch products immediately when the component mounts
    fetchApi();
   
    
    // Set up an interval to fetch products every 5 seconds
    const intervalId = setInterval(fetchApi, 2000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

 




  //set handle for onClick event
  const backHome1 = () =>{
    window.location = "/main";
  }
  
  const val = 50
   
  const style1 = {
    borderRadius: '5px',
    height:"30px",
    backgroundColor: "#337CCF",
    marginTop : '1%',
    width: '580px',

    
  }
  const style2 = {
    borderRadius: '5px',
    height:"30px",
    backgroundColor: "#0c8542",
    width: val+'%',
  }

  

  return(
    
    <div className='animate__animated animate__fadeIn'>
{sharedVariable}
        <img className={"logo2 d-flex justify-content-center mt-4"} src={require('../Assets/img/logo.png')} alt="" />
        <h1 className={"d-flex justify-content-center mt-2"}>Dashboard Monitoring</h1>
        <div className={"mt-3 card"}>     
            
                <div className={"row pt-4 ps-5"}>
                    <div className={"col-8 "}>
                       <h4 className={"status"}>Status Battery</h4>
                    </div>
                    <div className={"col-2 d-flex justify-content-center"}>
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


                <div className={"container mt-4 ps-3 styleD pe-4"}>
                    <div className={"row"}>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Volt | Amper
                            </div>
                            <div className={"col-md-6 val"}>
                            value
                            </div>
                            </div>

                    </div>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Max Kw
                            </div>
                            <div className={"col-md-6 val"}>
                                value
                            </div>
                            </div>
                    </div>
                    </div>
                    
                    
                </div>



                <div className={"container mt-2 ps-3 styleD pe-4"}>
                    <div className={"row"}>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Current Time
                            </div>
                            <div className={"col-md-6 val"}>
                            value
                            </div>
                            </div>

                    </div>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Current Kwh
                            </div>
                            <div className={"col-md-6 val"}>
                            value
                            </div>
                            </div>
                    </div>
                    </div>
                    
                    
                </div>



                <div className={"container mt-2 ps-3 styleD pe-4 "}>
                    <div className={"row"}>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Estimate
                            </div>
                            <div className={"col-md-6 val"}>
                            value
                            </div>
                            </div>

                    </div>
                    <div className={"col-md-6"}>

                            <div className={"row"}>
                            <div className={"col-md-6"}>
                            •Channel
                            </div>
                            <div className={"col-md-6 val"}>
                            value
                            </div>
                            </div>
                    </div>
                    </div>
                    
                    
                </div>

                <div className="d-flex justify-content-center mt-3 mb-3"> 
                        <button onClick={backHome1} className="btnFinish mt-3 d-flex-justify-content-center">
                            <div className="row">
                                <div className="col-1">
                                <img className={"home  btnfinish ms-3"}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdZJREFUWEftl9FRAzEMRKVOSCWQSiCVAJVAKiGdECpZZjN2RiNsWXb4CEz8F5/PfreS1orKlQ29Mh75f0AAXkTkuSj9qqr8vTwuVugGNNL+ppBXCMCdiNyp6oHPegqVdaKqx5HK9vlUUpvDz9UUALHaHkVkP1N5aSAAHyLy4Mt7AFTt4Kiqm4xSKSAHw32tQjy0eo+dfxKRNwORghoCRTAlh5pAjfzi1Luq7iKlQiAADBFDVce2JnOdANAFKlBeqR97pJPaqdP8uhFQQ6mDqm57KnUV8uqoanNtEohW8RkpXZ9FQExIyh3GPgNUVLL7dS/hLFA37hNANh+7YYuAKDGl5tjMOm7H4WvYuhYQAeEc107+ZIzOrgFQ91wCsgqFpZoByxZJpFDzqsgc3loDwPrRUg7Z1jT0jgwkgFTVZn2ILQTDNtVKGDf/FR/iJvyqesMvq+QcP7xkZ++y6X8VLnco2vpd1nBYTqWhXK/Ed4cqZ9oPHzpuzFza+Zvf5QyrtBrr6Z1MkzYEKiq1oCrY6ctF5EtE7k3O2eIbKjO8XDvWTy+pbWmm2qdCzMUphZz9U60RGEO6Lx3ilFVMAzXgqi0QlIczV05/kVbGRUArB47euQH9OYW+AQkNKjSf6gJxAAAAAElFTkSuQmCC"/>
                                
                                </div>
                                <div className="col">
                                <h5 className={"back"}>Finished Charge</h5>
                                </div>
                            </div>
                        </button>
                </div>

        </div>


       
     
    
    </div>

  )
}

export default App;