import React from "react";
import "./main.scss";
import Flights from "./flights";

const Main = () => {
  return (
    <div className="main-section">
      <div className="main-heading">Fly over the horizon...</div>
      <Flights />
    </div>
  );
};

export default Main;
