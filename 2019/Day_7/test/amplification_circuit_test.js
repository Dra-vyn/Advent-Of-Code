import { assertEquals } from "@std/assert";
import { amplifier } from "../src/amplification_circuit.js";

Deno.test("sample test 1 Part 1", () => {
  const input = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0';
  assertEquals(amplifier(input), 43210)
});

Deno.test("sample test 2 Part 1", () => {
  const input = '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0';
  assertEquals(amplifier(input), 54321)
});

Deno.test("sample test 3 Part 1", () => {
  const input = '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0';
  assertEquals(amplifier(input), 65210)
});

Deno.test("Main test Part 1", () => {
  const input = Deno.readTextFileSync("data/input.txt")
  assertEquals(amplifier(input), 272368)
});