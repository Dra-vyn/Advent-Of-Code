import { chunk } from "@std/collections";

const image = { 0: "⬛️", 1: "⬜️" };

const mul = (x, y) => x * y;

export const parse = (input) =>
  input.split("").map((x) => parseInt(x));

export const createLayer = (input, length) => chunk(input, length);

export const count = (layer, num) => layer.filter((x) => x === num).length;

const formatInput = (input) => createLayer(parse(input), 150);

export const findLeastZeroLayer = (layers) => {
  const count0 = layers.map((layer) => count(layer, 0));
  const index = count0.indexOf(Math.min(...count0));
  return layers[index];
}

export const findOnesAndTwos = (layer) => [count(layer, 1), count(layer, 2)];

export const part1 = (input) => {
  const layers = formatInput(input);
  const leastZeroLayer = findLeastZeroLayer(layers)
  return mul(...findOnesAndTwos(leastZeroLayer));
};

const iterateThroughRows = (layers, array, i) => {
  for (let j = 0; j < layers.length; j++) {
    if ([0, 1].includes(layers[j][i])) {
      array.push(image[layers[j][i]]);
      return array;
    }
  }
  return array;
}

export const formatOutput = (pixel) =>
  pixel.map((x) => x.join("")).join("\n");

const pixels = (layers) => {
  const array = [];

  for (let i = 0; i < layers[0].length; i++) {
    iterateThroughRows(layers, array, i)
  }
  
  return chunk(array, 25);
};

export const part2 = (input) => {
  const pixelsInLayers = pixels(formatInput(input));
  return formatOutput(pixelsInLayers);
}