const offsets = { "R": [1, 0], "U": [0, 1], "L": [-1, 0], "D": [0, -1] };

export const separateInstructions = (instructions) =>
  instructions.split("\n").map((x) => x.split(","));

export const fetchCoordinates = (instructions, i) => {
  const centralPoint = { x: 0, y: 0 }
  const path = instructions[i].reduce((acc, x) => {
    const direction = x.slice(0, 1);
    const [dx, dy] = offsets[direction];
    for (let index = 0; index < +x.slice(1); index++) {
      const coordinate = [`${centralPoint.x + dx},${centralPoint.y + dy}`];
      centralPoint.x = centralPoint.x + dx;
      centralPoint.y = centralPoint.y + dy;
      acc.unshift(coordinate);
    }
    return acc;
  }, []);
  return path.flatMap(s => s);
}

const shortestDistance = (x, y) => Math.abs(+x + +y);

export const executeInstructions = (instructions) => {
  const input = separateInstructions(instructions);
  const path1 = fetchCoordinates(input, 0);
  const path2 = fetchCoordinates(input, 1);
  const intersectPoints = path1.filter(x => path2.includes(x));
  const s = intersectPoints.map(x => shortestDistance(...(x.split(','))));
  return s.sort((a, b) => a - b)[0];
};
