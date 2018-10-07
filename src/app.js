import * as PIXI from "pixi.js";
import Walker from "./walker.js";
import { Point } from "pixi.js";
import { Moves } from "./enums.js";
import bunny from "./bunny.png";

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
let texture = PIXI.Texture.fromImage(bunny);

const walkersList = [];

let origin = new PIXI.Point(10, 300),
  destination = new PIXI.Point(600, 300);
walkersList.push(new Walker(texture, origin, destination, app));

(origin = new PIXI.Point(10, 350)), (destination = new PIXI.Point(600, 350));
walkersList.push(new Walker(texture, origin, destination, app));

origin = new PIXI.Point(600, 300);
destination = new PIXI.Point(50, 300);
walkersList.push(new Walker(texture, origin, destination, app));

origin = new PIXI.Point(300, 50);
destination = new PIXI.Point(300, 500);
walkersList.push(new Walker(texture, origin, destination, app));

walkersList.forEach(walker => {
  app.stage.addChild(walker);
});

app.ticker.add(update);

function update() {
  walkersList.forEach((walker, myIndex) => {
    //do next step
    walker.update();
    //check for collision
    walkersList.forEach((otherGuy, otherIndex) => {
      if (otherGuy !== walker) {
        if (walker.hits(otherGuy.position)) {
          console.log(myIndex, "hitting", otherIndex);
          walker.evade(Moves.WAYPOINT_REVERSE, otherGuy);
        }
        let lookAheadTime;
        lookAheadTime = 60 * 3;
        if (walker.willHit(lookAheadTime, otherGuy.position)) {
          console.log(myIndex, "will hit 3sec", otherIndex);
          walker.evade(Moves.WAYPOINT_EITHER, otherGuy);
        }
        lookAheadTime = 60 * 2;
        if (walker.willHit(lookAheadTime, otherGuy.position)) {
          console.log(myIndex, "will hit 2sec", otherIndex);
          walker.evade(Moves.WAYPOINT_EITHER, otherGuy);
        }
        lookAheadTime = 60 * 1;
        if (walker.willHit(lookAheadTime, otherGuy.position)) {
          console.log(myIndex, "will hit 1sec", otherIndex);
          walker.evade(Moves.WAYPOINT_EITHER, otherGuy);
        }
      }
    });
  });
}
