import React from "react";
import "../styles/Card.css"

const Card = ({ title, icon, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
