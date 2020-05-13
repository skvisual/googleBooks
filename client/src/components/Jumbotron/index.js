import React from "react";
import "./style.css";

// declare Jumbotron

function Jumbotron({ children }) {
  return <div className="jumbotron mt-4">{children}</div>;
}

// export Jumbotron for use elsewhere
export default Jumbotron;
