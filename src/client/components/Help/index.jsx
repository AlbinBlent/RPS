import React, { Component } from "react";
import "./Help.css";
import Navbar from "../Navbar";

class Help extends Component {
  render() {
    return (
      <div>
        <div className="help">
          <Navbar />
          <h1>Need help?</h1>
          <p>Contact:</p>
        </div>
        <span className="help-background" />
      </div>
    );
  }
}
export default Help;
