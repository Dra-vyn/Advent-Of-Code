import { assertEquals } from "@std/assert";
import { test } from "../src/asteroids.js";

// Deno.test.only('main test 1', () => {
//   const input = Deno.readTextFileSync("Data/input.txt");
//   assertEquals(test(input),9775037)
// });

Deno.test("input : 1,0,0,0,99", () =>
  assertEquals(test("1,0,0,0,99"), "2,0,0,0,99"));

Deno.test("input : 2,4,4,5,99,0", () =>
  assertEquals(test("2,4,4,5,99,0"), "2,4,4,5,99,9801"));

Deno.test("input : 1101,100,-1,4,0", () =>
  assertEquals(test("1101,100,-1,4,0"), "1101,100,-1,4,99"));

// Deno.test('main test 2', () => {
//   const input = Deno.readTextFileSync("Data/input.txt");
//   assertEquals(test(input),15586959)
// });
