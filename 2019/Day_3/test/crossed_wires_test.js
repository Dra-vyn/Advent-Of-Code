import { assertEquals } from "@std/assert";
import { executeInstructions } from "../src/crossed_wires.js";

Deno.test('simple test', () => {
  const input = 'R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83';
  assertEquals(executeInstructions(input), 159)
})

Deno.test('simple test', () => {
  const input = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7';
  assertEquals(executeInstructions(input), 135)
})

Deno.test.only('simple test', () => {
  const input = Deno.readTextFileSync("Data/input.txt")
  assertEquals(executeInstructions(input), 529)
})