import React, { Component } from "react";
import "./Walker.css";
import { Moves } from "simulation";
//import { createWalker } from "simulation";

class Walker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //defaults
      name: "Walker",
      origin: {
        x: 0,
        y: 0
      },
      destination: { x: 0, y: 0 },
      collisionDetection: {
        linear: {
          seconds: [1, 3],
          moves: [Moves.WAYPOINT_EITHER]
        }
      }
    };
  }
  render() {
    return <div className="Walker">{this.state.name}</div>;
  }
}

export default Walker;
