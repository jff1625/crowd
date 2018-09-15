import * as PIXI from 'pixi.js';
import walker from './walker.js';
import { Point } from 'pixi.js';
import bunny from './bunny.png';


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

let origin = new PIXI.Point(10, 10),
    destination = new PIXI.Point(Math.random() * app.screen.width, Math.random() * app.screen.height);
let thing1 = new walker(texture, origin, destination, app);
app.stage.addChild(thing1);

origin = new PIXI.Point(630, 470),
    destination = new PIXI.Point(Math.random() * app.screen.width, Math.random() * app.screen.height);
let thing2 = new walker(texture, origin, destination, app);
app.stage.addChild(thing2);

