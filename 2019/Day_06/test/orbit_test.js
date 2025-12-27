import { assertEquals } from "@std/assert";
import { part1, part2 } from "../src/orbit.js";

Deno.test('Sample test Part 1', () => {
  const input = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L';
  assertEquals(part1(input), 42)
});

Deno.test('main test Part 1', () => {
  const input = Deno.readTextFileSync("data/input.txt");
  assertEquals(part1(input), 150150)
});

Deno.test('sample test Part 2', () => {
  const input = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN';
  assertEquals(part2(input), 4)
});

Deno.test('main test Part 2', () => {
  const input = Deno.readTextFileSync("data/input.txt");
  assertEquals(part2(input), 352)
});