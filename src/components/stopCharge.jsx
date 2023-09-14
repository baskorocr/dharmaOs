import axios from "axios";

function stopCharge(sharedVariable,navigate){
    
    axios.post('http://10.20.27.100/api/outlets/'+sharedVariable+'/coap/stop')
    .then(response => {
      console.log(response.status);
      if(response.status === 200){
        navigate("/home");
      }
  
    }).catch(err =>{
        navigate('/error');
        console.log(err);
    })
  }

export default stopCharge;