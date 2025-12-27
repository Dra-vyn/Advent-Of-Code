const checkCondition = {
  0: () => true,
  1: (num, index) =>
    num[index] !== num[index - 2] && num[index] === num[index - 1] &&
    num[index] !== num[index + 1],
};

export const isValidNum = (num, key) => {
  const result = { isNonDecrement: true, isRepeat: false };

  for (let i = 1; i <= num.length - 1; i++) {
    if (+num[i] < +num[i - 1]) result.isNonDecrement = false;
    if (num[i] === num[i - 1] && checkCondition[key](num, i)) {
      result.isRepeat = true;
    }
  }

  return result.isNonDecrement && result.isRepeat;
};

export const test = (numberRange, key = 0) => {
  const [startNum, endNum] = numberRange.split("-");
  let count = 0;

  for (let i = +startNum; i <= +endNum; i++) {
    const num = i.toString();
    isValidNum(num, key) ? count++ : count;
  }

  return count;
};

export const part2 = (numberRange) => test(numberRange, 1);