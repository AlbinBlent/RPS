import React, { Component } from "react";
import "./AppButtons.css";

class AppButtons extends Component {
  render() {
    return (
      <button className="app-button" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default AppButtons;
