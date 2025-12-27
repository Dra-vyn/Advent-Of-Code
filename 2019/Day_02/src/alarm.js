const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const OPCODES = { 1: add, 2: mul, 99: "halt" };

const parse = (input) => eval(`[${input}]`);

const createComputer = (program, overRides = []) => {
  const modifiedProgram = program.slice();
  overRides.forEach(([position, value]) => modifiedProgram[position] = value);
  return {
    program: modifiedProgram,
    currentIndex: 0,
    isHalted: false,
  };
};

const addOrMul = (program, currentIndex) => {
  const [input1, input2, output] = program.slice(
    currentIndex + 1,
    currentIndex + 4,
  );

  program[output] = OPCODES[program[currentIndex]](
    program[input1],
    program[input2],
  );
};

const stepForward = (computer) => {
  const { program, currentIndex } = computer;

  if (program[currentIndex] === 99) {
    computer.isHalted = true;
    return computer;
  }

  if ([1, 2].includes(program[currentIndex])) {
    addOrMul(program, currentIndex);
  }

  computer.currentIndex += 4;
  return computer;
};

const execute = (computer) => {
  while (!computer.isHalted) {
    stepForward(computer);
  }

  return computer;
};

export const alarmAssist = (input, overRides) => {
  const program = parse(input);
  const computer = createComputer(program, overRides);
  const currentState = execute(computer);
  return currentState.program;
};

export const test = (input) => alarmAssist(input).join(",");

export const part1 = (input, overRides) => alarmAssist(input, overRides)[0];

export const fetchNounAndVerb = (intCode) => {
  for (let noun = 100; noun > 0; noun--) {
    for (let verb = 0; verb < 100; verb++) {
      const output = part1(intCode, [[1, noun], [2, verb]]);
      
      if (output === 19690720) return 100 * noun + verb;
    }
  }
};
