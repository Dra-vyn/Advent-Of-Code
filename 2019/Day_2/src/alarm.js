const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const opcodes = { 1: add, 2: mul, 99: 'halt' };

export const processCode = (intCode) => {
  const code = intCode.split(',');
  let index = 0;
  let opCode = '';

  while (opCode !== 'halt') {
    if (index % 4 === 0) opCode = opcodes[code[index]];
    if (index % 2 === 0 && index % 4 !== 0) {
      const int1 = +code[code[index - 1]];
      const int2 = +code[code[index]];
      const position = +code[index + 1];
      code[position] = opCode(int1, int2);
    }
    index++;
  }
  return code.join(',');
}

export const alarmAssist = (intCode) => {
  const code = intCode.split(',');
  code[1] = 12;
  code[2] = 2;
  return processCode(code.join(',')).split(',')[0];
}