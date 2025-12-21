import { assertEquals } from "@std/assert";
import * as allfns from "../src/space_image_format.js";

Deno.test("Parse Function Test", () =>
  assertEquals(allfns.parse("123456"), [1, 2, 3, 4, 5, 6]));

Deno.test("Create Layer Function Test", () => {
  const input = [1, 2, 3, 4, 5, 6];
  assertEquals(allfns.createLayer(input, 3), [[1, 2, 3], [4, 5, 6]])
});

Deno.test("Count Function Test", () => {
  const input = [1, 0, 4, 0, 3, 4, 0, 4, 2, 1];
  assertEquals(allfns.count(input, 0), 3)
});

Deno.test("Find Least Zero Layer Function Test", () => {
  const input = [[1, 0, 4], [0, 3, 0], [0, 4, 2], [1, 4, 9]];
  assertEquals(allfns.findLeastZeroLayer(input), [1, 4, 9])
});

Deno.test("Main Test Part 1", () => {
  const input = Deno.readTextFileSync("data/input.txt");
  assertEquals(allfns.part1(input), 1862)
});

Deno.test("Find Ones And Twos Function Test", () => {
  const input = [1, 3, 2, 4, 1, 1, 2, 3, 1, 2, 2, 2, 1, 2];
  assertEquals(allfns.findOnesAndTwos(input), [5, 6])
});

Deno.test("Format Output Function Test", () => {
  const input = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
  assertEquals(allfns.formatOutput(input), 'ABC\nDEF\nGHI')
});

// Deno.test("Main Test Part 2", () => {
//   const input = Deno.readTextFileSync("data/input.txt");
//   assertEquals(allfns.part2(input), )
// });
