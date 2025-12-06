import { assertEquals } from "@std/assert";
import * as allfns from "../src/asteroids.js";

// Deno.test('main test 1', () => {
//   const input = Deno.readTextFileSync("Data/input.txt");
//   assertEquals(allfns.processCode(input),9775037)
// });

Deno.test("input : 1,0,0,0,99" , () =>
  assertEquals(allfns.processCode("1,0,0,0,99"), "2,0,0,0,99"));

Deno.test("input : 2,4,4,5,99,0", () =>
  assertEquals(allfns.processCode("2,4,4,5,99,0"), "2,4,4,5,99,9801"));

Deno.test("input : 1101,100,-1,4,0", () =>
  assertEquals(allfns.processCode("1101,100,-1,4,0"), "1101,100,-1,4,99"));

// Deno.test('main test 2', () => {
//   const input = Deno.readTextFileSync("Data/input.txt");
//   assertEquals(allfns.processCode(input),15586959)
// });
