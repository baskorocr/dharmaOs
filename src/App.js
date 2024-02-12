// importing components from react-router-dom package
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Home component
import Home from "./components/home";
// import About component
import Main from "./components/main";
// import ContactUs component
import Cek from "./components/cekConect";
import Dashboard from "./components/dashCharge";
import Error from "./components/error";
import store from "./state/store";
import { Provider } from "react-redux";
import PowerUp from "./components/powerUp";
import Untwisted from "./components/untwist";
import Payment from "./components/payment.jsx";
import Test from "./components/test";

function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cek" element={<Cek />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/error" element={<Error />} />
            <Route path="/powerup" element={<PowerUp />} />
            <Route path="/untwist" element={<Untwisted />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
