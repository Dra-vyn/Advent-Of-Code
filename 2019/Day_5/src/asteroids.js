const add = (x, y) => x + y;

const mul = (x, y) => x * y;

const addOperation = (index, int1, code, int2) => {
  const outputIndex = +code[index + 3];
  code[outputIndex] = add(int1, int2);
  return index + 4;
}

const mulOperation = (index, int1, code, int2) => {
  const outputIndex = +code[index + 3];
  code[outputIndex] = mul(int1, int2);
  return index + 4;
}

const addInput = (index, int1, code) => {
  code[+code[index + 1]] = prompt('enter num');
  return index + 2;
};

const print = (index, int1) => {
  console.log(int1);
  return index + 2;
}

const jumpIfTrue = (index, int1, code, int2) =>
  int1 !== 0 ? int2 : index + 3;

const jumpIfFalse = (index, int1, code, int2) =>
  int1 === 0 ? int2 : index + 3;

const lessThan = (index, int1, code, int2) => {
  const outputIndex = +code[index + 3];
  code[outputIndex] = int1 < int2 ? 1 : 0;
  return index + 4;
}

const equals = (index, int1, code, int2) => {
  const outputIndex = +code[index + 3];
  code[outputIndex] = int1 === int2 ? 1 : 0;
  return index + 4;
}

const opcodes = {
  1: addOperation, 2: mulOperation, 3: addInput, 4: print, 5: jumpIfTrue,
  6: jumpIfFalse, 7: lessThan, 8: equals, 99: "halt"
};

const immediateValue = (code, i, addOn) => +code[i + addOn];

const positionValue = (code, i, addOn) => +code[+code[i + addOn]];

export const immediateMode = (code, i) =>
  [immediateValue(code, i, 1), immediateValue(code, i, 2)];

export const secondImmediate = (code, i) =>
  [positionValue(code, i, 1), immediateValue(code, i, 2)];

export const firstImmediate = (code, i) =>
  [immediateValue(code, i, 1), positionValue(code, i, 2)];

export const normalMode = (code, i) =>
  [positionValue(code, i, 1), positionValue(code, i, 2)];

const modeType = {
  0 : normalMode,
  100: firstImmediate,
  1000: secondImmediate,
  1100: immediateMode,
};

export const findMode = (code, index) => {
  const key = Math.floor(+code[index] / 100) * 100;
  return modeType[key](code, index);
}

export const codeProcess = (code, opCode, index) => {
  const [int1, int2] = findMode(code, index);
  if (opCode === 'halt') return;
  return opCode(index, int1, code, int2);
};

export const process = (code, i) => {
  const op = opcodes[+code[i] % 100];

  if (op !== 'halt') {
    i = codeProcess(code, op, i);
  }

  return [op, i];
};

export const processCode = (intCode) => {
  const code = intCode.split(",");
  let { index, opCode } = { index: 0, opCode: '' };

  while (opCode !== "halt") {
    const [op, i] = process(code, index);
    index = i;
    opCode = op;
  }
  
  return code.join(",");
};