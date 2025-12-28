import { zip } from "@std/collections";

const compass = {
  "N": { left: "W", right: "E", offset: [0, 1] },
  "E": { left: "N", right: "S", offset: [1, 0] },
  "S": { left: "E", right: "W", offset: [0, -1] },
  "W": { left: "S", right: "N", offset: [-1, 0] },
};

const getPanel = (computer, i) => computer.currentStatus.panel[i];

const getPaintedPanel = (computer, j, i) =>
  computer.paintedPanels[j].coordinate[i];

const isBothEqual = (computer, i) =>
  getPaintedPanel(computer, i, 0) === getPanel(computer, 0) &&
  getPaintedPanel(computer, i, 1) === getPanel(computer, 1);

const createNewPanel = (computer, direction) => ({
  coordinate: [getPanel(computer, 0), getPanel(computer, 1)],
  color: 0,
  direction,
});

const addNewPanel = (computer, direction) => {
  const panel = createNewPanel(computer, direction);
  computer.paintedPanels.push(panel);
  computer.currentStatus.color = 0;
  return computer;
};

const modifyCurrentPanel = (computer, direction) => {
  const [dx, dy] = compass[direction].offset;
  computer.currentStatus.panel = [
    getPanel(computer, 0) + dx,
    getPanel(computer, 1) + dy,
  ];
  computer.currentStatus.direction = direction;
  return computer;
};

const findNextPanelColor = (computer, direction) => {
  let isModified = false;

  for (let j = 0; j < computer.paintedPanels.length; j++) {
    if (isBothEqual(computer, j)) {
      computer.paintedPanels[j].direction = direction;
      computer.currentStatus.color = computer.paintedPanels[j].color;
      isModified = true;
      return computer;
    }
  }

  if (!isModified) return addNewPanel(computer, direction);

  return computer;
};

const modifyCurrentCoordinate = (computer, direction) => {
  const rotation = direction === 1 ? "right" : "left";
  const newDirection = compass[computer.currentStatus.direction][rotation];
  modifyCurrentPanel(computer, newDirection);
  findNextPanelColor(computer, newDirection);
  return computer;
};

const paintPanel = (computer) => {
  const [color, direction] = computer.output;
  computer.output = [];

  for (let i = 0; i < computer.paintedPanels.length; i++) {
    if (isBothEqual(computer, i)) {
      computer.paintedPanels[i].color = color;
      modifyCurrentCoordinate(computer, direction);
      return computer;
    }
  }
};

const parse = (input) => eval(`[${input}]`);

const slice = (computer, length) => {
  const start = computer.currentIndex + 1;
  const end = computer.currentIndex + length;
  return computer.program.slice(start, end);
};

const positionMode = (input, computer) => {
  const value = computer.program[input];
  return value === undefined ? 0 : value;
};

const immediateMode = (input) => +input;

const relativeMode = (input, computer) => {
  const value = computer.program[input + computer.relativeBase];
  return value === undefined ? 0 : value;
};

const MODES = { 0: positionMode, 1: immediateMode, 2: relativeMode };

const outputPosition = (input, computer) =>
  input[1] === 0 || input[1] === 1
    ? input[0]
    : input[0] + computer.relativeBase;

const findMode = (computer, placeValue) => {
  let opCode = computer.program[computer.currentIndex];
  const array = [];

  for (let i = placeValue; i >= 100; i = i / 10) {
    const key = Math.floor(opCode / i);
    opCode = opCode % i;
    array.unshift(key);
  }

  return array;
};

const zipParametersWithModes = (computer, length) =>
  zip(slice(computer, length), findMode(computer, 10 ** length));

const fetchParameter = (input, computer) => MODES[input[1]](input[0], computer);

const add = (computer) => {
  const [input1, input2, output] = zipParametersWithModes(computer, 4);
  const int1 = fetchParameter(input1, computer);
  const int2 = fetchParameter(input2, computer);
  const outputLocation = outputPosition(output, computer);
  computer.program[outputLocation] = int1 + int2;
  computer.currentIndex += 4;
  return computer;
};

const mul = (computer) => {
  const [input1, input2, output] = zipParametersWithModes(computer, 4);
  const int1 = fetchParameter(input1, computer);
  const int2 = fetchParameter(input2, computer);
  const outputLocation = outputPosition(output, computer);
  computer.program[outputLocation] = int1 * int2;
  computer.currentIndex += 4;
  return computer;
};

const takeInput = (computer) => {
  const [output] = zipParametersWithModes(computer, 2);
  const outputLocation = outputPosition(output, computer);
  computer.program[outputLocation] = computer.currentStatus.color;
  computer.currentIndex += 2;
  return computer;
};

const print = (computer) => {
  const [input] = zipParametersWithModes(computer, 2);
  const int1 = fetchParameter(input, computer);
  // console.log(int1);
  computer.output.push(int1);
  if (computer.output.length === 2) paintPanel(computer);
  computer.currentIndex += 2;
  return computer;
};

const jumpIfTrue = (computer) => {
  const [input1, input2] = zipParametersWithModes(computer, 3);
  const int1 = fetchParameter(input1, computer);
  const int2 = fetchParameter(input2, computer);
  computer.currentIndex = int1 !== 0 ? int2 : computer.currentIndex + 3;
  return computer;
};

const jumpIfFalse = (computer) => {
  const [input1, input2] = zipParametersWithModes(computer, 3);
  const int1 = fetchParameter(input1, computer);
  const int2 = fetchParameter(input2, computer);
  computer.currentIndex = int1 === 0 ? int2 : computer.currentIndex + 3;
  return computer;
};

const lessThan = (computer) => {
  const [input1, input2, output] = zipParametersWithModes(computer, 4);
  const int1 = fetchParameter(input1, computer);
  const int2 = fetchParameter(input2, computer);
  const outputLocation = outputPosition(output, computer);
  computer.program[outputLocation] = int1 < int2 ? 1 : 0;
  computer.currentIndex += 4;
  return computer;
};

const equals = (computer) => {
  const [input1, input2, output] = zipParametersWithModes(computer, 4);
  const int1 = fetchParameter(input1, computer);
  const int2 = fetchParameter(input2, computer);
  const outputLocation = outputPosition(output, computer);
  computer.program[outputLocation] = int1 === int2 ? 1 : 0;
  computer.currentIndex += 4;
  return computer;
};

const adjustRelativeBase = (computer) => {
  const [input] = zipParametersWithModes(computer, 2);
  const int1 = fetchParameter(input, computer);
  computer.relativeBase += int1;
  computer.currentIndex += 2;
  return computer;
};

const OPCODES = {
  1: add,
  2: mul,
  3: takeInput,
  4: print,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
  9: adjustRelativeBase,
  99: "halt",
};

const stepForward = (computer) => {
  const { program, currentIndex } = computer;
  const opCode = program[currentIndex] % 100;

  if (opCode === 99) {
    computer.isHalted = true;
    return computer;
  } else {
    OPCODES[opCode](computer);
  }

  return computer;
};

const execute = (computer) => {
  while (!computer.isHalted) {
    stepForward(computer);
  }

  return computer;
};

const createComputer = (program, overrides) => ({
  program,
  currentIndex: 0,
  relativeBase: 0,
  isHalted: false,
  output: [],
  currentStatus: { panel: [0, 5], color: overrides, direction: "N" },
  paintedPanels: [{ coordinate: [0, 5], color: overrides }],
});

const updateImage = (image, computer, i) => {
  const x = getPaintedPanel(computer, i, 0);
  const y = getPaintedPanel(computer, i, 1);
  image[y][x] = computer.paintedPanels[i].color === 0 ? "⬛️" : "⬜️";
  return image;
};

const isUndefined = (image, computer, i) =>
  image[getPaintedPanel(computer, i, 1)] === undefined;

const createNewArray = (computer, i) =>
  Array.from( { length: (getPaintedPanel(computer, i, 1) + 1) }, () =>
    Array.from({ length: (getPaintedPanel(computer, i, 0) + 1) }, () => "  "));

const getImage = (computer) => {
  let image = [];

  for (let i = 0; i < computer.paintedPanels.length; i++) {
    if (isUndefined(image, computer, i)) {
      image = image.concat(createNewArray(computer, i));
    }
    updateImage(image, computer, i);
  }

  return image.map((x) => x.join("")).join("\n");
};

const alarmAssist = (input, overrides) => {
  const program = parse(input);
  const computer = createComputer(program, overrides);
  return execute(computer);
};

const test = (input, overrides = 0) => alarmAssist(input, overrides);

export const part1 = (input) => test(input).paintedPanels.length;

export const part2 = (input) => {
  const computer = test(input, 1);
  const image = getImage(computer);
  console.log(image);
};
