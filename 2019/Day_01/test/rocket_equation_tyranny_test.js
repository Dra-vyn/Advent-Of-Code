import { assertEquals } from "@std/assert";
import * as allfns from "../src/rocket_equation_tyranny.js";

Deno.test("compute fuel value function test of 12", () => {
  assertEquals(allfns.computeFuelValue(12), 2);
});

Deno.test("compute fuel value function test of 14", () => {
  assertEquals(allfns.computeFuelValue(14), 2);
});

Deno.test("compute fuel value function test of 1969", () => {
  assertEquals(allfns.computeFuelValue(1969), 654);
});

Deno.test("compute fuel value function test of 100756", () => {
  assertEquals(allfns.computeFuelValue(100756), 33583);
});

Deno.test("Total fuel Required part 1", () => {
  const input = Deno.readTextFileSync("Data/input.txt");
  assertEquals(allfns.part1(input), 3297866);
});

Deno.test("compute fuel value function test of 14", () => {
  assertEquals(allfns.fuelOfFuel(14), 2);
});

Deno.test("compute fuel value function test of 1969", () => {
  assertEquals(allfns.fuelOfFuel(1969), 966);
});

Deno.test("compute fuel value function test of 100756", () => {
  assertEquals(allfns.fuelOfFuel(100756), 50346);
});

Deno.test("Total fuel Required part 2", () => {
  const input = Deno.readTextFileSync("Data/input.txt");
  assertEquals(allfns.part2(input), 4943923);
});