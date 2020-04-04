import React from 'react';
import NumberFormat from 'react-number-format';

export const makeNumberThousandSeparator = (value, tCountry) => {
  let thousandSeparator = ',';
  let decimalSeparator = '.';
  if (tCountry === 'br') {
    thousandSeparator = '.';
    decimalSeparator = ',';
  }
  return (
    <NumberFormat
      value={value}
      thousandSeparator={thousandSeparator}
      decimalSeparator={decimalSeparator}
      displayType={'text'}
    />
  );
};

export const replaceStringToNumber = string =>
  typeof string !== 'number' ? parseInt(string.split(',').join('')) : string;

export const calcPercent = (value, main) => {
  return (replaceStringToNumber(value) * 100) / replaceStringToNumber(main);
};
