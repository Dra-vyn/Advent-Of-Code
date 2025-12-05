import { intersect, minWith } from "@std/collections";

const offsets = { "R": [1, 0], "U": [0, 1], "L": [-1, 0], "D": [0, -1] };

export const getShortest = (array) => minWith(array, (a, b) => a - b);

export const add = (x, y) => Math.abs(x) + Math.abs(y);

export const calculateDistance = (intersectPoints) => 
  intersectPoints.map((x) => {
    const coordinate = x.split(",");
    return add(...coordinate);
  });
  

export const createFetchCoordinates = (centralPoint) => (acc, x) => {
  const [dx, dy] = offsets[x.slice(0, 1)];

  for (let index = 0; index < +x.slice(1); index++) {
    centralPoint.x = centralPoint.x + dx;
    centralPoint.y = centralPoint.y + dy;
    const coordinate = [`${centralPoint.x},${centralPoint.y}`];
    acc.push(coordinate);
  }
  return acc;
};

export const findCoordinates = (instructions) => {
  const centralPoint = { x: 0, y: 0 };
  const path = instructions.reduce(createFetchCoordinates(centralPoint), []);
  return path.flatMap((x) => x);
};

export const separateInstructions = (instructions) =>
  instructions.split("\n").map((x) => x.split(","));

export const parseInput = (instructions) => {
  const input = separateInstructions(instructions);
  return input.map((x) => findCoordinates(x));
};

export const findIntersections = (instructions) => {
  const [path1, path2] = parseInput(instructions);
  const intersectPoints = intersect(path1, path2)
  return [ intersectPoints , path1, path2 ];
};

export const part1 = (instructions) => {
  const [intersectPoints] = findIntersections(instructions);
  const distance = calculateDistance(intersectPoints);
  return getShortest(distance);
}

export const fetchSteps = (intersectPoints, path1, path2) =>
  intersectPoints.map(x => path1.indexOf(x) + path2.indexOf(x) + 2);

export const part2 = (instructions) => {
  const [intersectPoints, path1, path2] = findIntersections(instructions);
  const steps = fetchSteps(intersectPoints, path1, path2);
  return getShortest(steps);
}