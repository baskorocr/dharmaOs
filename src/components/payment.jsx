import React, { useEffect } from "react";
import "../Assets/index.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Payment() {
  const apiUrl1 = process.env.REACT_APP_API_URL;
  const apiUrl2 = process.env.REACT_APP_API_URL2 + "/api/createInv";
  const apiKey = process.env.REACT_APP_API_KEY;
  const IdMcn = process.env.REACT_APP_API_MCN;
  const storedData = localStorage.getItem("myData");
  const parse = JSON.parse(storedData);

  const navigate = useNavigate();
  const sharedVariable = useSelector((state) => state.sharedVariable);
  const kWh = localStorage.getItem("kWh");
  console.log(sharedVariable);

  console.log(apiUrl1, apiUrl2, apiKey);

  useEffect(() => {
    showSnap();
  }, []); // The empty dependency array ensures that the effect runs only once after the initial render

  function showSnap() {
    const data = {
      nomerHp: "089654825055",
      idMachine: IdMcn,
      kWh: kWh,
      tarifkWh: "1800",
    };

    const snapSrcUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const script = document.createElement("script");
    script.src = snapSrcUrl;
    script.setAttribute("data-client-key", parse.tokenClient);
    script.async = true;

    console.log(parse.tokenClient);

    script.onload = () => {
      // Script is loaded, make API request
      axios
        .post(apiUrl2, data)
        .then((response) => {
          console.log(response["data"]["url"]);
          window.snap.pay(response["data"]["url"], {
            onSuccess: (result) => {
              console.log("Payment successful:", result);
              // Handle successful payment
              Auth();
            },
            onPending: function (result) {
              navigate("/home");
            },
            onError: function (result) {
              navigate("/home");
            },
            onClose: function (result) {
              navigate("/home");
            },
            // Handle other events and errors as needed
          });
        })
        .catch((err) => {
          console.error("Token Tidak Valid");
        })
        .finally(() => {
          // Remove the script after API request is complete
          document.body.removeChild(script);
        });
    };

    script.onerror = (error) => {
      console.error("Error loading script:", error);
    };

    document.body.appendChild(script);
  }

  function Auth() {
    axios
      .post(
        process.env.REACT_APP_API_URL +
          "/api/outlets/" +
          sharedVariable +
          "/coap/auth"
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/powerup");
        }
      })
      .catch((err) => {
        navigate("/error");
        console.log(err);
      });
  }
}

export default Payment;
