export const replaceStringToNumber = string =>
  typeof string !== 'number' ? parseInt(string.replace(',', '')) : string;

export const replaceValue = string => string.replace(',', '');

export const calcPercent = (value, main) => {
  return (replaceStringToNumber(value) * 100) / replaceStringToNumber(main);
};
