export const replaceStringToNumber = string =>
  typeof string !== 'number' ? parseInt(string.split(',').join('')) : string;

export const calcPercent = (value, main) => {
  return (replaceStringToNumber(value) * 100) / replaceStringToNumber(main);
};
