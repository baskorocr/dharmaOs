
// importing components from react-router-dom package
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

  
// import Home component
import Home from "./components/home";
// import About component
import Main from "./components/main";
// import ContactUs component
import ContactUs from "./components/ContactUs";
  
function App() {
  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>
    </>
  );
}
  
export default App;