import axios from "axios";




const ControlEme = function(navigate, val2){
   
    
  
    if(val2 == ''){
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
    else if(val2 === 'ccs'){
      console.log("dasds");
    }
    
    

    
}

export default ControlEme;