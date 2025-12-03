import { assertEquals } from "@std/assert";
import * as allfns from "../src/alarm.js";

Deno.test("input : 1,0,0,0,99" , () =>
  assertEquals(allfns.processCode("1,0,0,0,99"), "2,0,0,0,99"));

Deno.test("input : 2,3,0,3,99", () =>
  assertEquals(allfns.processCode("2,3,0,3,99"), "2,3,0,6,99"));

Deno.test("input : 2,4,4,5,99,0", () =>
  assertEquals(allfns.processCode("2,4,4,5,99,0"), "2,4,4,5,99,9801"));

Deno.test("input : 1,1,1,4,99,5,6,0,99", () =>
  assertEquals(
    allfns.processCode("1,1,1,4,99,5,6,0,99"),
    "30,1,1,4,2,5,6,0,99",
  ));

Deno.test("main test", () => {
  const input = Deno.readTextFileSync("Data/input.txt");
  assertEquals(allfns.alarmAssist(input, 12, 2), '3706713')
});

Deno.test("main test part 2", () => {
  const input = Deno.readTextFileSync("Data/input.txt");
  assertEquals(allfns.fetchNounAndVerb(input), 8609)
});