import React from "react";
import Card from "./Card";
import { FiUser, FiMail, FiInfo, FiSettings } from "react-icons/fi";

const CardGrid = () => {
  return (
    <div className="card-grid">
      <Card title="Profile" icon={<FiUser />}>
        <p>Manage your personal details and preferences.</p>
      </Card>
      <Card title="Contact" icon={<FiMail />}>
        <p>View and update your contact information.</p>
      </Card>
      <Card title="Information" icon={<FiInfo />}>
        <p>Access system information and updates.</p>
      </Card>
      <Card title="Settings" icon={<FiSettings />}>
        <p>Configure your dashboard and privacy options.</p>
      </Card>
    </div>
  );
};

export default CardGrid;
