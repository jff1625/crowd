import * as PIXI from "pixi.js";
import { distance, direction } from "./utils.js";
import { Moves } from "./enums.js";

const MAX_SPEED = 2; // px per frame
const MAX_WAYPOINTS = 2;

export default class Walker extends PIXI.Sprite {
  constructor(texture, origin, destination, app) {
    super(texture);
    this.position = origin;
    this.direction = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.vx = 0;
    this.vy = 0;
    this.speed = 0;
    this.waypoints = [destination];
    this.app = app;
    this.config = {
      linearLookAhead: {
        seconds: [1, 3],
        move: Moves.WAYPOINT_EITHER
      }
    };
  }

  setConfig(config) {
    for (prop in config) {
      this.config[prop] = config[prop];
    }
  }

  update() {
    // each frame we spin the bunny around a bit, for a laff
    this.rotation += 0.01;

    //reduce speed when very close so as not to overshoot and wobble about
    const finalDestination = this.waypoints[this.waypoints.length - 1];
    this.speed = Math.min(this.getDistance(finalDestination), MAX_SPEED);

    //current destination is zero'th waypoint
    let waypoint = this.waypoints[0];
    //if we're close enough to the waypoint, go to the next waypoint instead
    if (this.getDistance(waypoint) < this.speed) {
      this.waypoints.shift();
      waypoint = this.waypoints[0];
    }
    //find direction to the waypoint (last is final destination)
    this.direction = this.getDirection(waypoint);

    this.vx = -this.speed * Math.cos(this.direction);
    this.vy = -this.speed * Math.sin(this.direction);
    this.x += this.vx;
    this.y += this.vy;
  }

  checkCollision(otherGuys) {
    otherGuys.forEach((otherGuy, otherIndex) => {
      if (this.hits(otherGuy.position)) {
        console.log(`hitting: ${otherIndex}`);
        this.evade(Moves.WAYPOINT_REVERSE, otherGuy);
      }
      //linearLookAhead
      const lookAhead = this.config.linearLookAhead;
      lookAhead.seconds.forEach(val => {
        let framesAhead = val * this.app.ticker.FPS;
        if (this.willHit(framesAhead, otherGuy.position)) {
          console.log(`will hit ${val}sec: ${otherIndex}`);
          this.evade(lookAhead.move, otherGuy);
        }
      });
    });
  }

  hits(point) {
    return this.getDistance(point) <= this.width;
  }

  willHit(framesAhead, point) {
    const futurePoint = new PIXI.Point(
      this.x + this.vx * framesAhead,
      this.y + this.vy * framesAhead
    );
    return distance(futurePoint, point) < this.width;
  }

  //get the distance from here to a specified point
  getDistance(point) {
    return distance(this.position, point);
  }

  //get the direction from here to a specified point
  getDirection(point) {
    return direction(this.position, point);
  }

  addWaypoint(waypoint) {
    if (this.waypoints.length >= MAX_WAYPOINTS) {
      this.waypoints.shift();
    }
    this.waypoints.unshift(waypoint);
  }

  makeWaypoint(dir, dist) {
    const dx = -dist * Math.cos(dir);
    const dy = -dist * Math.sin(dir);
    return new PIXI.Point(this.x + dx, this.y + dy);
  }

  evade(move, target) {
    let newDirection, dist, waypoint, directionToTarget, shouldTurnRight;
    switch (move) {
      case Moves.WAYPOINT_REVERSE:
        console.log("reversing, BEEP BEEP");
        directionToTarget = this.getDirection(target.position);
        newDirection = Math.PI + directionToTarget;
        dist = this.speed * 10; // 60fps
        waypoint = this.makeWaypoint(newDirection, dist);
        this.addWaypoint(waypoint);
        break;
      case Moves.WAYPOINT_RIGHT:
        //add PI / 10 == a small angle, seems good
        newDirection = this.direction + Math.PI / 10;
        dist = this.speed * 60; // 60fps
        waypoint = this.makeWaypoint(newDirection, dist);
        this.addWaypoint(waypoint);
        break;
      case Moves.WAYPOINT_EITHER:
        directionToTarget = this.getDirection(target.position);
        shouldTurnRight = directionToTarget > this.direction;
        newDirection = shouldTurnRight
          ? this.direction + Math.PI / 10
          : this.direction - Math.PI / 10;
        dist = this.speed * 60; // 60fps
        waypoint = this.makeWaypoint(newDirection, dist);
        this.addWaypoint(waypoint);
        break;
    }
  }
}
