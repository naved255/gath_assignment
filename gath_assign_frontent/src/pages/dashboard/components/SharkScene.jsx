import React from "react";
import "../styles/dashboardPage.css";
import svgShark from '../../../assets/Shark.svg'

const SharkScene = () => {
  return (
    <div className="shark-scene">
        <img src={svgShark} alt="Shark_svg" />
    </div>
  );
};

export default SharkScene;
