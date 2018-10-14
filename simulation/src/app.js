import * as PIXI from "pixi.js";
import Walker from "./walker.js";
import { Point } from "pixi.js";
import { Moves } from "./enums.js";
import bunny from "./bunny.png";
import { create } from "domain";

//don't crap all over my nice clean global namespace you filty animal!
delete window.PIXI;

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();
export default app;

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);
let texture;
const walkersList = [];

export function createWalker(
  origin,
  destination,
  texture = PIXI.Texture.fromImage(bunny)
) {
  const orig = new PIXI.Point(origin.x, origin.y);
  const dest = new PIXI.Point(destination.x, destination.y);
  const walker = new Walker(texture, orig, dest, app);
  walker.setConfig({
    linearLookAhead: {
      seconds: [1, 3],
      move: Moves.WAYPOINT_EITHER
    }
  });
  walkersList.push(walker);
  app.stage.addChild(walker);
}

export function start() {
  app.ticker.add(update);
}

export function stop() {
  app.ticker.remove(update);
  app.stage.removeChildren();
}

function update() {
  walkersList.forEach((walker, myIndex) => {
    //do next step
    walker.update();
    //check for collision
    const otherGuys = walkersList.filter((guy, index) => index !== myIndex);
    walker.checkCollision(otherGuys);
  });
}

createWalker({ x: 10, y: 300 }, { x: 600, y: 350 });
createWalker({ x: 10, y: 350 }, { x: 600, y: 300 });
createWalker({ x: 600, y: 300 }, { x: 50, y: 300 });
createWalker({ x: 300, y: 50 }, { x: 300, y: 500 });
start();

//need to expose to controlpanel
// start stop reset
// create new walker
// origin / destination
//
// linearLookAhead disabled / array
// linearLookAheadMove default WAYPOINT_EITHER
