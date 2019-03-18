import React, { Component } from "react";
import "./MoveButtons.css";

class MoveButtons extends Component {
  render() {
    return (
      <button className="move-button" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default MoveButtons;
