/**
 * @jest-environment jsdom
 */

import { distance, direction } from "./utils.js";
jest.mock("./utils.js");

import * as PIXI from "pixi.js";

import Walker from "./walker.js";

describe("walker", () => {
  let w,
    texture = PIXI.Texture.fromImage("./bunny.png"),
    origin = new PIXI.Point(1, 2),
    destination = new PIXI.Point(1, 2),
    app = new PIXI.Application();

  beforeEach(() => {
    //jest.doMock("pixi.js");
    w = new Walker(texture, origin, destination, app);
  });

  it("exists", () => {
    expect(w).toBeDefined();
  });

  it("extends PIXI Sprite", () => {
    expect(w).toBeInstanceOf(PIXI.Sprite);
  });

  it("can detect hit at exact same point", () => {
    const point = new PIXI.Point(1, 2);
    distance.mockReturnValue(0);
    expect(w.hits(point)).toBeTruthy();
  });

  it("can detect hit very near same point", () => {
    const point = new PIXI.Point(1, 2);
    distance.mockReturnValue(1);
    expect(w.hits(point)).toBeTruthy();
  });
});
