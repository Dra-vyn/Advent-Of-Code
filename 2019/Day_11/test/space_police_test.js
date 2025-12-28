import { assertEquals } from "@std/assert";
import { part1, part2 } from "../src/space_police.js";

Deno.test("Sample Test", () => {
  const input = Deno.readTextFileSync("data/input.txt");
  assertEquals(part1(input), 2226)
});

// Deno.test("Sample Test", () => {
//   const input = Deno.readTextFileSync("data/input.txt");
//   assertEquals(part2(input), )
// });
