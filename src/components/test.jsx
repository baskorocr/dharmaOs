import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState("");
  const idMcn = process.env.REACT_APP_API_MCN;
  const ApiUrl = process.env.REACT_APP_API_URLTest + "/api/machine";

  console.log(idMcn);

  useEffect(() => {
    // Retrieving data from local storage on component mount
    const storedData = localStorage.getItem("myData");

    if (storedData == null) {
      dataLoad();
    } else {
      const parse = JSON.parse(storedData);
      console.log(parse.tokenServer);
      setData(parse);
    }
  }, []);

  const dataLoad = () => {
    // const headers = {
    //   code: "DRMA",
    // };
    // axios.post(ApiUrl, null, { headers }).then((response) => {
    //   console.log(response.data);
    //   localStorage.setItem("myData", JSON.stringify(response));
    // });
    const headers = {
      "Content-Type": "application/json",
      code: "DRMA",
    };

    const data = {
      idMachine: idMcn,
    };
    axios
      .post(ApiUrl, data, { headers })
      .then((response) => {
        if (response.data.success) {
          // Access token data
          const tokenServer = response.data.token;
          localStorage.setItem("myData", JSON.stringify(tokenServer));

          console.log("Token Server:", tokenServer);
        } else {
          console.error("Server response indicates failure.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <p>Data: {data.tokenServer}</p>
    </div>
  );
};

export default App;
