const add = (computer, input1, input2, output) => {
  computer.program[output] = input1 + input2;
  computer.currentIndex += 4;
  return computer;
};

const mul = (computer, input1, input2, output) => {
  computer.program[output] = input1 * input2;
  computer.currentIndex += 4;
  return computer;
};

const takeInput = (computer) => {
  const outputPosition = computer.program[computer.currentIndex + 1];
  computer.program[outputPosition] = parseInt(prompt("enter num"));
  computer.currentIndex += 2;
  return computer;
};

const print = (computer, input1) => {
  console.log(input1);
  computer.currentIndex += 2;
  return computer;
};

const jumpIfTrue = (computer, input1, input2) => {
  computer.currentIndex = input1 !== 0 ? input2 : computer.currentIndex + 3;
  return computer;
};

const jumpIfFalse = (computer, input1, input2) => {
  computer.currentIndex = input1 === 0 ? input2 : computer.currentIndex + 3;
  return computer;
};

const lessThan = (computer, input1, input2, output) => {
  computer.program[output] = input1 < input2 ? 1 : 0;
  computer.currentIndex += 4;
  return computer;
};

const equals = (computer, input1, input2, output) => {
  computer.program[output] = input1 === input2 ? 1 : 0;
  computer.currentIndex += 4;
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
  99: "halt",
};

const parse = (input) => eval(`[${input}]`);

const immediateMode = (input1, input2) => [input1, input2];

const secondImmediate = (input1, input2, program) => [program[input1], input2];

const firstImmediate = (input1, input2, program) => [input1, program[input2]];

const normalMode = (
  input1,
  input2,
  program,
) => [program[input1], program[input2]];

const modeType = {
  0: normalMode,
  100: firstImmediate,
  1000: secondImmediate,
  1100: immediateMode,
};

export const findMode = (program, currentIndex, input1, input2) => {
  const key = Math.floor(program[currentIndex] / 100) * 100;
  return modeType[key](input1, input2, program);
};

const createComputer = (program, overRides = []) => {
  const modifiedProgram = program.slice();
  overRides.forEach(([position, value]) => modifiedProgram[position] = value);
  return {
    program: modifiedProgram,
    currentIndex: 0,
    isHalted: false,
  };
};

const executeOpCode = (computer, opCode) => {
  const [input1, input2, output] = computer.program.slice(
    computer.currentIndex + 1,
    computer.currentIndex + 4,
  );

  const [int1, int2] = findMode(
    computer.program,
    computer.currentIndex,
    input1,
    input2,
  );

  return OPCODES[opCode](computer, int1, int2, output);
};

const stepForward = (computer) => {
  const { program, currentIndex } = computer;
  const opCode = program[currentIndex] % 100;

  if (opCode === 99) {
    computer.isHalted = true;
    return computer;
  } else {
    executeOpCode(computer, opCode);
  }

  return computer;
};

const execute = (computer) => {
  while (!computer.isHalted) {
    stepForward(computer);
  }

  return computer;
};

const alarmAssist = (input, overRides) => {
  const program = parse(input);
  const computer = createComputer(program, overRides);
  const currentState = execute(computer);
  return currentState.program;
};

export const test = (input) => alarmAssist(input).join(",");
