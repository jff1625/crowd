import * as PIXI from "pixi.js";
import { distance, direction } from "./utils.js";

const SPEED = 3;

export default class Walker extends PIXI.Sprite {
  constructor(texture, origin, destination, app) {
    super(texture);
    this.position = origin;
    this.destination = destination;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.init(app);
  }

  init(app) {
    //not much in here
  }

  update() {
    // each frame we spin the bunny around a bit, for a laff
    this.rotation += 0.01;

    //reduce speed when very close so as not to overshoot and wobble about
    const speed = Math.min(this.distance(this.destination), SPEED);
    const theDirection = this.direction(this.destination);

    this.x -= speed * Math.cos(theDirection);
    this.y -= speed * Math.sin(theDirection);
  }

  hits(point) {
    return this.distance(point) < this.width;
  }

  //get the distance from here to a specified point
  distance(point) {
    return distance(this.position, point);
  }

  //get the direction from here to a specified point
  direction(point) {
    return direction(this.position, point);
  }
}
