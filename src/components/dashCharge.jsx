import React,{useState,useEffect} from "react";
import ReactDOM from 'react-dom/client';
import '../Assets/index.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





function App(){

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

 

  //set state for button on/off
  var button1,button2,button3;


  //set handle for onClick event
  const backHome1 = () =>{
    window.location = "/main";
  }

  

  return(
    
    <div className='animate__animated animate__fadeIn'>

        <img className={"logo2 d-flex justify-content-center mt-3"} src={require('../Assets/img/logo.png')} alt="" />
        <h1 className={"d-flex justify-content-center mt-2"}>Dashboard Monitoring</h1>
        <div className={"mt-3 dashboard"}>     
            
                <div className={"row pt-3 ps-5"}>
                    <div className={"col-8 "}>
                       <h4 className={"status"}>Status Battery</h4>
                    </div>
                    <div className={"col-1 d-flex justify-content-center"}>
                        <h4 className={"status"}>0%</h4>
                    </div>
                    <div className="col-2">
                    <img className={"iconBt"}  src={require('../Assets/img/charging.gif')}/>
                    </div>
                </div>
                <div className="line"></div>
                <div className="d-flex justify-content-center">
                <button onClick={backHome1} className="btnFinish mt-3 d-flex-justify-content-center">
                    <div className="row">
                        <div className="col-1">
                        <img className={"home mt-2 ms-2"}  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAdZJREFUWEftl9FRAzEMRKVOSCWQSiCVAJVAKiGdECpZZjN2RiNsWXb4CEz8F5/PfreS1orKlQ29Mh75f0AAXkTkuSj9qqr8vTwuVugGNNL+ppBXCMCdiNyp6oHPegqVdaKqx5HK9vlUUpvDz9UUALHaHkVkP1N5aSAAHyLy4Mt7AFTt4Kiqm4xSKSAHw32tQjy0eo+dfxKRNwORghoCRTAlh5pAjfzi1Luq7iKlQiAADBFDVce2JnOdANAFKlBeqR97pJPaqdP8uhFQQ6mDqm57KnUV8uqoanNtEohW8RkpXZ9FQExIyh3GPgNUVLL7dS/hLFA37hNANh+7YYuAKDGl5tjMOm7H4WvYuhYQAeEc107+ZIzOrgFQ91wCsgqFpZoByxZJpFDzqsgc3loDwPrRUg7Z1jT0jgwkgFTVZn2ILQTDNtVKGDf/FR/iJvyqesMvq+QcP7xkZ++y6X8VLnco2vpd1nBYTqWhXK/Ed4cqZ9oPHzpuzFza+Zvf5QyrtBrr6Z1MkzYEKiq1oCrY6ctF5EtE7k3O2eIbKjO8XDvWTy+pbWmm2qdCzMUphZz9U60RGEO6Lx3ilFVMAzXgqi0QlIczV05/kVbGRUArB47euQH9OYW+AQkNKjSf6gJxAAAAAElFTkSuQmCC"/>
                        
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