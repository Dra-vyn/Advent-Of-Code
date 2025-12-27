import { permutations } from "@std/collections";

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
  // console.log(input1);
  computer.output = input1;
  computer.pause = true;
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
  }

  executeOpCode(computer, opCode, input, phase);

  return computer;
};

const execute = (computer, input, phase) => {
  while (!computer.isHalted && !computer.pause) {
    stepForward(computer, input, phase);
  }

  return computer;
};

const alarmAssist = (input, inputVal, phase) => {
  const program = parse(input);
  const computer = createComputer(program);
  const currentState = execute(computer, inputVal, phase);
  return currentState;
};

const feedbackLoop = (currentStates) => {
  let input = currentStates[currentStates.length - 1].output;
  const currentStatus = [];
  
  for (const i in currentStates) {
    if (!currentStates[i].isHalted) {
      currentStates[i].pause = false;
      currentStatus.push(execute(currentStates[i], input));
      input = currentStatus[i].output;
    }
  }

  if (currentStatus[currentStatus.length - 1].isHalted) {
      return currentStatus[currentStatus.length - 1].output;
  }
  
  return feedbackLoop(currentStatus)
}

export const test = (program, phase) => {
  const currentStates = [];

  for (let i = 0; i < 5; i++) {
    const input = i === 0 ? 0 : currentStates[i - 1].output;
    const currentState = alarmAssist(program, input, +phase[i]);
    currentStates.push(currentState);
  }
  return feedbackLoop(currentStates);
}

const findPhaseCombination = () => {
  const phase = ["9", "8", "7", "6", "5"];
  const array = [];
  for (let i = 56789; i <= 98765; i++) {
    array.push(`${i}`);
  }
  return array.filter((x) => phase.every((y) => x.includes(y)));
};

export const amplifier = (input) => {
  const phase = findPhaseCombination();
  return phase.map(x => test(input, x)).sort((a, b) => b - a)[0];
}
