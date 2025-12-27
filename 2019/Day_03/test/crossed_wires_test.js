import { assertEquals } from "@std/assert";
import * as allfns from "../src/crossed_wires.js";

Deno.test("sample test 1 - Part 1", () => {
  const input =
    "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83";
  assertEquals(allfns.part1(input), 159);
});

Deno.test("sample test 2 - Part 1", () => {
  const input =
    "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7";
  assertEquals(allfns.part1(input), 135);
});

Deno.test("separate Instructions Function test", () => {
  const input =
    "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83";
  assertEquals(allfns.separateInstructions(input), [
    ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72" ],
    ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83" ]]);
});

Deno.test("calculate distance Function test", () => 
  assertEquals(allfns.calculateDistance(
    ["107,71", "107,51", "107,47", "124,11", "157,18"]),
    [178, 158, 154, 135, 175]));

Deno.test("add Function test", () => 
  assertEquals(allfns.add(2, 3), 5));

Deno.test("get shortest Function test", () => 
  assertEquals(allfns.getShortest([ 178, 158, 154, 135, 175 ]), 135));

Deno.test("Main test - Part 1", () => {
  const input = Deno.readTextFileSync("Data/input.txt");
  assertEquals(allfns.part1(input), 529);
});

Deno.test("sample test 1 - Part 2", () => {
  const input =
    'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83'
  assertEquals(allfns.part2(input), 610);
});

Deno.test("sample test 2 - Part 2", () => {
  const input =
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
  assertEquals(allfns.part2(input), 410);
});

Deno.test("Main test - Part 2", () => {
  const input = Deno.readTextFileSync("Data/input.txt");
  assertEquals(allfns.part2(input), 20386);
});

