import axios from "axios";

const url = process.env.REACT_APP_API_URL2;

function stopCharge(sharedVariable, navigate) {
  axios
    .post(
      process.env.REACT_APP_API_URL +
        "/api/outlets/" +
        sharedVariable +
        "/coap/stop"
    )
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        deleteBook();
        navigate("/home");
      }
    })
    .catch((err) => {
      navigate("/error");
      console.log(err);
    });
}

const deleteBook = async () => {
  const postData = {
    idMachine: process.env.REACT_APP_API_MCN,
  };

  try {
    const resp = await axios.post(url + "/api/updateMachine", postData);
    console.log(resp.status);
  } catch (e) {
    console.log(e.message);
  }
};

export default stopCharge;
