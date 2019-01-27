import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default () => (
  <div className="navbar">
    <Link className="navbar-icon" to="/help">
      <img src={require("../../../assets/info-circle-outline-512.png")} />
    </Link>
  </div>
);
