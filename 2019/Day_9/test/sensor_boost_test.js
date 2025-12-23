import { assertEquals } from "@std/assert";
import { test } from "../src/sensor_boost.js";

Deno.test('Sample Test 1 Part 1', () => {
  const input = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
  assertEquals(test(input), '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99');
});

Deno.test('Sample Test 2 Part 1', () => {
  const input = '1102,34915192,34915192,7,4,7,99,0';
  assertEquals(test(input), '1219070632396864')
});

Deno.test('Sample Test 3 Part 1', () => {
  const input = '104,1125899906842624,99'
  assertEquals(test(input), '1125899906842624')
});

Deno.test('Main Test Part 1', () => {
  const input = Deno.readTextFileSync("data/input.txt");
  assertEquals(test(input), '2662308295')
});

Deno.test('Main Test Part 1', () => {
  const input = Deno.readTextFileSync("data/input.txt");
  assertEquals(test(input), '63441')
});