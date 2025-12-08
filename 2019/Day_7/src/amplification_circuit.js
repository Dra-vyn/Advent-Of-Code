const add = (x, y) => x + y;

const mul = (x, y) => x * y;

const lessThan = (int1, int2) => int1 < int2 ? 1 : 0;

const equals = (int1, int2) => int1 === int2 ? 1 : 0;

const utils = (index, int1, int2, code, operation) => {
  const outputIndex = +code[index + 3];
  code[outputIndex] = operation(int1, int2);
  return index + 4;
};

const addOperation = (index, int1, int2, code) =>
  utils(index, int1, int2, code, add);

const mulOperation = (index, int1, int2, code) =>
  utils(index, int1, int2, code, mul);

const addInput = (index, int1, int2, code, count, phase, input) => {
  code[+code[index + 1]] = count[0] === 0 ? phase : input;
  count[0] += 1;
  return index + 2;
};

const print = (index, int1, int2, code, count) => {
  count[1] = int1;
  return index + 2;
};

const jumpIfTrue = (index, int1, int2) => int1 !== 0 ? int2 : index + 3;

const jumpIfFalse = (index, int1, int2) => int1 === 0 ? int2 : index + 3;

const lessThanOperation = (index, int1, int2, code) =>
  utils(index, int1, int2, code, lessThan);

const equalsOperation = (index, int1, int2, code) =>
  utils(index, int1, int2, code, equals);

const opcodes = {
  1: addOperation,
  2: mulOperation,
  3: addInput,
  4: print,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThanOperation,
  8: equalsOperation,
  99: "halt",
};

const immediateValue = (code, i, addOn) => +code[i + addOn];

const positionValue = (code, i, addOn) => +code[+code[i + addOn]];

export const immediateMode = (
  code,
  i,
) => [immediateValue(code, i, 1), immediateValue(code, i, 2)];

export const secondImmediate = (
  code,
  i,
) => [positionValue(code, i, 1), immediateValue(code, i, 2)];

export const firstImmediate = (
  code,
  i,
) => [immediateValue(code, i, 1), positionValue(code, i, 2)];

export const normalMode = (
  code,
  i,
) => [positionValue(code, i, 1), positionValue(code, i, 2)];

const modeType = {
  0: normalMode,
  100: firstImmediate,
  1000: secondImmediate,
  1100: immediateMode,
};

export const findMode = (code, index) => {
  const key = Math.floor(+code[index] / 100) * 100;
  return modeType[key](code, index);
};

export const executeInstruction = (
  code,
  opCode,
  index,
  count,
  phase,
  input,
) => {
  const [int1, int2] = findMode(code, index);
  if (opCode === "halt") return;
  return opCode(index, int1, int2, code, count, phase, input);
};

export const evaluateOperation = (code, i, count, phase, input) => {
  const op = opcodes[+code[i] % 100];

  if (op !== "halt") {
    i = executeInstruction(code, op, i, count, phase, input);
  }

  return [op, i];
};

export const evaluateIntCode = (intCode, count, phase, input = 0) => {
  const code = intCode.split(",");
  let { index, opCode } = { index: 0, opCode: "" };

  while (opCode !== "halt") {
    const [op, i] = evaluateOperation(code, index, count, phase, input);
    index = i;
    opCode = op;
  }

  return code.join(",");
};

const findPhaseCombination = () => {
  const phase = ["0", "1", "2", "3", "4"];
  const array = [];
  for (let i = 1234; i <= 43210; i++) {
    array.push(`${i}`.padStart(5, "0"));
  }
  return array.filter((x) => phase.every((y) => x.includes(y)));
};

export const amplifier = (intCode) => {
  const phase = findPhaseCombination();
  const array = []
  for (let i = 0; i < phase.length; i++) {
    const element = phase[i];
    const count = [0, 0];
    for (let j = 0; j < 5; j++) {
      count[0] = 0;
      evaluateIntCode(intCode, count, +element[j], count[1]);
    }
    array.push(count[1]);
  }
  return array.sort((a, b) => b - a)[0];
}