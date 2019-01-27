import React, { Component } from "react";
import "./Startpage.css";
import Navbar from "../Navbar/";

class Startpage extends Component {
  render() {
    return (
      <span>
        <div className="startpage">
          <Navbar />
          <h1>Welcome to Rock, Paper, Scissors!</h1>
          <p>This game was created by Robin & Albin.</p>
        </div>
        <span className="start-background" />
      </span>
    );
  }
}

export default Startpage;
