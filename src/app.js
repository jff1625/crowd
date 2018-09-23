import * as PIXI from "pixi.js";
import Walker from "./walker.js";
import { Point } from "pixi.js";
import bunny from "./bunny.png";

//don't shit all over my nice clean global namespace you filty animal!
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

let origin = new PIXI.Point(10, 100),
  destination = new PIXI.Point(600, 100);
walkersList.push(new Walker(texture, origin, destination, app));

origin = new PIXI.Point(300, 100);
destination = new PIXI.Point(300, 100);
walkersList.push(new Walker(texture, origin, destination, app));

walkersList.forEach(walker => {
  app.stage.addChild(walker);
});

app.ticker.add(update);

function update() {
  walkersList.forEach(walker => {
    //do next step
    walker.update();
    //check for collision
    walkersList.forEach(otherGuy => {
      if (otherGuy !== walker) {
        if (walker.hits(otherGuy.position)) {
          console.log("hit");
        }
      }
    });
  });
}
