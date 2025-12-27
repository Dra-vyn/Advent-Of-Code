import { zip } from "@std/collections";

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
  input[1] === 0 || input[1] === 1 ? input[0] : input[0] + computer.relativeBase;

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
  computer.program[outputLocation] = parseInt(prompt("enter num"));
  computer.currentIndex += 2;
  return computer;
};

const print = (computer) => {
  const [input] = zipParametersWithModes(computer, 2);
  const int1 = fetchParameter(input, computer);
  console.log(int1);
  computer.output.push(int1)
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

const createComputer = (program) => ({
  program,
  currentIndex: 0,
  relativeBase: 0,
  isHalted: false,
  output : []
});

const alarmAssist = (input) => {
  const program = parse(input);
  const computer = createComputer(program);
  const currentState = execute(computer);
  return currentState.output;
};

export const test = (input) => alarmAssist(input).join(",");
