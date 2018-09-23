/**
 * @jest-environment jsdom
 */

import { distance, direction } from "./utils.js";
jest.mock("./utils.js");

import * as PIXI from "pixi.js";
//jest.mock("pixi.js");

import Walker from "./walker.js";

describe("walker", () => {
  let w,
    texture,
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
});
