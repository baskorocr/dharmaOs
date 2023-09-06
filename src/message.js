import axios from 'axios';
import React,{useState} from 'react';
export function Message(){
    const apiUrl = 'http://10.20.27.50:3001/updates';
    const [data, setData] = useState([]);
    axios.get(apiUrl)
    .then(response => {
      
      console.log(response.data['curr_ses_errMsg']);
      if(response.data['curr_ses_error'] === 41){
        setData("dsads");
      }
      else{
        return false;
      }
    })
    .catch(error => {
      
        return true;
    });

    return data;
}