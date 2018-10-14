import React, { Component } from "react";
import "./ControlPanel.css";
import { createWalker } from "simulation";
import Walker from "./Walker.js";

class ControlPanel extends Component {
  render() {
    return (
      <div className="ControlPanel">
        <header className="ControlPanel-header">
          This is the control panel
        </header>
        <div id="WalkerList">
          <Walker />
        </div>
      </div>
    );
  }
}

export default ControlPanel;
