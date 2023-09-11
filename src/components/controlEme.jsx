import axios from "axios";




const ControlEme = function(navigate, val){

    if(val === ''){
      defaultGetEme(navigate);
    }
    else if(val === 'ccs'){
      CCSGetEme(navigate, val);
    }
    
    

    
}

function defaultGetEme(navigate){
      const apiUrl = 'http://10.20.27.100/api/system/iostate'; // Assuming this API returns a single product
      axios.get(apiUrl)
      .then(response => {
        
         if(response.data['io'][49]['value'] === 0){
          navigate("/untwist");
         }
       
      }).catch(error => {
        navigate('/error');
      })
}

function CCSGetEme(navigate, val){
  const apiUrl = 'http://10.20.27.100/api/outlets/'+val+'/state'; // Assuming this API returns a single product
      axios.get(apiUrl)
      .then(response => {
        
         if(response.data['evsestat'] === 5){
          stopCharge(val);
          navigate("/untwist");
         }
       
      }).catch(error => {
        navigate('/error');
      })
}
function stopCharge(val){
    
  axios.post('http://10.20.27.100/api/outlets/'+val+'/coap/stop')
  .then().catch(err =>{
      console.log(err);
  })
}

export default ControlEme;