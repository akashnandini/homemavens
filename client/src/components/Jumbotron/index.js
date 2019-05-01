import React from "react";
import "./jumbotron.css";
//import Carousel from "../Carousel"; 
function Jumbotron({ children }) {
  return (
    <div
      style={{ clear: "both", paddingTop: 50, textAlign: "left" }}
      className="jumbotron home"
    >
      {children}
      
    </div>
    
  );
 
}

export default Jumbotron;
