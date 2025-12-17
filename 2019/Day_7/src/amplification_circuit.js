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

const takeInput = (computer, input, phase) => {
  const outputPosition = computer.program[computer.currentIndex + 1];
  computer.program[outputPosition] = computer.iteration === 1 ? phase : input;
  computer.iteration -= 1;
  computer.currentIndex += 2;
  return computer;
};

const print = (computer, input1) => {
  console.log(input1);
  computer.output = input1;
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

const createComputer = (program) => {
  return {
    program,
    iteration: 1,
    currentIndex: 0,
    isHalted: false,
  };
};

const executeOpCode = (computer, opCode, input, phase) => {
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

  if (opCode === 3) {
    return OPCODES[opCode](computer, input, phase);
  }

  return OPCODES[opCode](computer, int1, int2, output);
};

const stepForward = (computer, input, phase) => {
  const { program, currentIndex } = computer;
  const opCode = program[currentIndex] % 100;

  if (opCode === 99) {
    computer.isHalted = true;
    return computer;
  } else {
    executeOpCode(computer, opCode, input, phase);
  }

  return computer;
};

const execute = (computer, input, phase) => {
  while (!computer.isHalted) {
    stepForward(computer, input, phase);
  }

  return computer;
};

const alarmAssist = (input, inputVal, phase) => {
  const program = parse(input);
  const computer = createComputer(program);
  const currentState = execute(computer, inputVal, phase);
  return currentState.output;
};

export const test = (program, phase, input = 0) => {
  const output1 = alarmAssist(program, input, +phase[0]);
  const output2 = alarmAssist(program, output1, +phase[1]);
  const output3 = alarmAssist(program, output2, +phase[2]);
  const output4 = alarmAssist(program, output3, +phase[3]);
  return alarmAssist(program, output4, +phase[4]);
}

const findPhaseCombination = () => {
  const phase = ["0", "1", "2", "3", "4"];
  const array = [];
  for (let i = 1234; i <= 43210; i++) {
    array.push(`${i}`.padStart(5, "0"));
  }
  return array.filter((x) => phase.every((y) => x.includes(y)));
};

export const amplifier = (input) => {
  const phase = findPhaseCombination();
  return phase.map(x => test(input, x)).sort((a, b) => b - a)[0];
}