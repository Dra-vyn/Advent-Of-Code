const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const opcodes = { 1: add, 2: mul, 99: "halt" };

export const processCode = (intCode) => {
  const code = intCode.split(",");
  let index = 0;
  let opCode = "";

  while (opCode !== "halt") {
    if (index % 4 === 0) opCode = opcodes[code[index]];
    if (index % 2 === 0 && index % 4 !== 0) {
      const int1 = +code[code[index - 1]];
      const int2 = +code[code[index]];
      const position = +code[index + 1];
      code[position] = opCode(int1, int2);
    }
    index++;
  }
  return code.join(",");
};

export const alarmAssist = (intCode, x, y) => {
  const code = intCode.split(",");
  code[1] = x;
  code[2] = y;
  return processCode(code.join(",")).split(",")[0];
};

export const fetchNounAndVerb = (intCode) => {
  for (let noun = 100; noun > 0; noun--) {
    for (let verb = 0; verb < 100; verb++) {

      const output = +alarmAssist(intCode, noun, verb);
      if (output === 19690720) return 100 * noun + verb;
    }
  }
};
