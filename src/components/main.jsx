import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; // Import bcryptjs directly
import Swal from "sweetalert2";

function Main() {
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL + "/";
  const ApiUrl2 = process.env.REACT_APP_API_URL2 + "/api/getToken";
  const idMcn = process.env.REACT_APP_API_MCN;

  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000);

    const storedData = localStorage.getItem("myData");
    console.log(storedData);
    if (storedData == null) {
      Dataload();
    } else {
      const parse = JSON.parse(storedData);
      console.log(parse.kWh[0]);
      setData(parse);
    }

    const handlePage = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", handlePage); // Changed to addEventListener
    return () => {
      clearInterval(interval);
      window.removeEventListener("wheel", handlePage);
    };
  }, []);

  const Dataload = async () => {
    try {
      const hashes = await bcrypt.hash(idMcn, 10);
      console.log(hashes);

      const headers = {
        "Content-Type": "application/json",
        code: hashes,
      };
      console.log(headers);

      const data = {
        idMachine: idMcn,
      };

      const response = await axios.post(ApiUrl2, data, { headers });
      console.log(response.data);
      if (response.data.tokenServer != null) {
        localStorage.removeItem("mydata");
        const mcn = response.data;
        localStorage.setItem("myData", JSON.stringify(mcn));
        console.log("Token Server:", mcn);
        setData(true);
      } else {
        navigate("/cekConfig");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);

      if (response.status === 200) {
        console.log(response.data);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn top">
      <img className={"logo"} src={require("../Assets/img/logo.png")} alt="" />

      <div className={"loading mt-4"}>
        <ReactLoading
          className={"loading"}
          type={"spin"}
          color={"#ffffff"}
          height={"20%"}
          width={"20%"}
        />
      </div>
      <h1 className={"d-flex justify-content-center mt-5"}>Start the engine</h1>
    </div>
  );
}

export default Main;
