import axios from "axios";

const ControlEme = function(navigate){
   
   
    const apiUrl = 'http://10.20.27.100/api/system/iostate'; // Assuming this API returns a single product
    axios.get(apiUrl)
    .then(response => {
       if(response.data['io'][48]['value'] === 0){
        navigate("/untwist");
       }
      
     
    }).catch(error => {
      navigate('/error');
    })

    
}

export default ControlEme;