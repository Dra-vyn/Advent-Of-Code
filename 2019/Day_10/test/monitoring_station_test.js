import { assertEquals } from "@std/assert";
import { formulate, part1, part2 } from "../src/monitoring_station.js";

Deno.test('Sample Test 1 Part 1', () => {
  const input = '.#..#\n.....\n#####\n....#\n...##'
  assertEquals(part1(input), { coordinate: [3, 4], visibleAsteroids : 8 })
})

Deno.test('Sample Test 2 Part 1', () => {
  const input = '......#.#.\n#..#.#....\n..#######.\n.#.#.###..\n.#..#.....\n..#....#.#\n#..#....#.\n.##.#..###\n##...#..#.\n.#....####'
  assertEquals(part1(input), { coordinate: [5, 8], visibleAsteroids : 33 })
})

Deno.test('Main Test Part 1', () => {
  const input = Deno.readTextFileSync("data/input.txt")
  assertEquals(part1(input), { coordinate: [8, 16], visibleAsteroids : 214 })
})

Deno.test('Sample Test 1 Part 2', () => {
  const input = '.#..##.###...#######\n##.############..##.\n.#.######.########.#\n.###.#######.####.#.\n#####.##.#.##.###.##\n..#####..#.#########\n####################\n#.####....###.#.#.##\n##.#################\n#####.##.###..####..\n..######..##.#######\n####.##.####...##..#\n.#####..#.######.###\n##...#.##########...\n#.##########.#######\n.####.#.###.###.#.##\n....##.##.###..#####\n.#.#.###########.###\n#.#.#.#####.####.###\n###.##.####.##.#..##';
  assertEquals(formulate(input), [8, 2])
})

Deno.test('Main Test Part 2', () => {
  const input = Deno.readTextFileSync("data/input.txt")
  assertEquals(part2(input), 502)
})