import { withoutAll, intersect } from "@std/collections";

const orbitCount = (orbit, key, count) => {
  let [total, satellite] = [count, key];

  while (satellite !== "COM") {
    satellite = orbit[satellite];
    total++;
  }
  return total;
};

const parseOrbits = (input) => {
  const orbitPair = input.split("\n").map((x) => x.split(")"));
  return orbitPair.reduce((acc, x) => (acc[x[1]] = x[0]) && acc, {});
};

const totalOrbitCount = (orbitPair) => {
  let count = 0;

  for (const satellite in orbitPair) {
    count = orbitCount(orbitPair, satellite, count);
  }
  return count;
}

const traceOrbitPath = (orbit, key) => {
  let satellite = key;  
  const path = [];
  
  while (satellite !== "COM") {
    satellite = orbit[satellite];
    path.push(satellite);
  }
  return path;
};

const getOrbitPath = (input, x, y) =>
  [traceOrbitPath(input, x), traceOrbitPath(input, y)];

const getOrbitTransfers = (orbit1, orbit2) => {
  const orbit = orbit1.concat(orbit2);
  const commonPaths = intersect(orbit1, orbit2);
  return withoutAll(orbit, commonPaths).length;
}

export const orbitTransfer = (input) => {
  const orbit = getOrbitPath(input, "YOU", "SAN");
  return getOrbitTransfers(...orbit);
};

export const part1 = (input) => totalOrbitCount(parseOrbits(input));

export const part2 = (input) => orbitTransfer(parseOrbits(input));


// const orbitCount = (orbit, key, count) => {
//   if (key === 'COM') return count;
//   const element = orbit[key];
//   count++;
//   return orbitCount(orbit, element, count);
// };