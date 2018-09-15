import { distance, direction } from "./utils.js";

describe("utils", () => {
  let p1, p2, p3;
  describe("distance()", () => {
    it("calculates the distance between two points in same horizontal row", () => {
      (p1 = { x: 0, y: 0 }), (p2 = { x: 100, y: 0 });
      p3 = distance(p1, p2);
      expect(p3).toEqual(100);

      (p1 = { x: 20, y: 0 }), (p2 = { x: 60, y: 0 });
      p3 = distance(p1, p2);
      expect(p3).toEqual(40);
    });

    it("calculates the distance between two points diagonally", () => {
      (p1 = { x: 0, y: 0 }), (p2 = { x: 100, y: 100 });
      p3 = distance(p1, p2);
      expect(p3).toBeCloseTo(141.421356, 6);

      (p1 = { x: 20, y: 40 }), (p2 = { x: 60, y: 75 });
      p3 = distance(p1, p2);
      expect(p3).toBeCloseTo(53.150729, 6);
    });
  });

  describe("direction()", () => {
    it("calculates the direction between two points in same horizontal row", () => {
      //right
      (p1 = { x: 0, y: 0 }), (p2 = { x: 100, y: 0 });
      p3 = direction(p1, p2);
      expect(p3).toBeCloseTo(Math.PI, 6);

      //left
      (p1 = { x: 100, y: 20 }), (p2 = { x: 20, y: 20 });
      p3 = direction(p1, p2);
      expect(p3).toBeCloseTo(0, 6);
    });

    it("calculates the direction between two points in same vertical row", () => {
      //down
      (p1 = { x: 0, y: 0 }), (p2 = { x: 0, y: 100 });
      p3 = direction(p1, p2);
      expect(p3).toBeCloseTo(-(Math.PI / 2), 6); // -1.570796

      //up
      (p1 = { x: 0, y: 100 }), (p2 = { x: 0, y: 10 });
      p3 = direction(p1, p2);
      expect(p3).toBeCloseTo(Math.PI / 2, 6); // -1.570796
    });
  });
});
