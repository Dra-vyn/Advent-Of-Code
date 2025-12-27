import { assertEquals } from "@std/assert";
import { isValidNum, part2, test } from "../src/secure_container.js";

Deno.test("function test - Part 1", () =>
  assertEquals(isValidNum('123455', 0), true));

Deno.test("Main test - Part 1", () =>
  assertEquals(test('137683-596253'), 1864));

Deno.test("function test - Part 2", () =>
  assertEquals(isValidNum('123555', 1), false));

Deno.test("Main test - Part 2", () =>
  assertEquals(part2('137683-596253'), 1258));