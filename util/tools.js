import dayjs from 'dayjs';
import AnimatedNumber from 'animated-number-react';

//converts Order Date from 1/2/19 => 1/2019, Item Total from '$150.45' to 150.45
export const convertData = (array) => {
  let newArray;
  //slice is to return entire array but last empty row
  array ? (newArray = array.data.slice(0, -1)) : (newArray = null);

  let convertedData = newArray.map((x) => ({
    ...x,
    'Order Date': dayjs(x['Order Date']).format('MMM/YYYY'),
    'Order Year': dayjs(x['Order Date']).format('YYYY'),
    'Calendar Date': dayjs(x['Order Date']).format('YYYY-MM-DD'),
    'Day of Week': dayjs(x['Order Date']).day(),
    'Item Total': cleanNumber(x['Item Total']),
    'Purchase Price Per Unit': cleanNumber(x['Purchase Price Per Unit']),
    'List Price Per Unit':
      cleanNumber(x['List Price Per Unit']) == 0
        ? cleanNumber(x['Purchase Price Per Unit'])
        : cleanNumber(x['List Price Per Unit']),
    Quantity: cleanNumber(x['Quantity']),
    Category:
      cleanString(x['Category']) == '' ? 'Misc' : cleanString(x['Category']),
  }));

  return convertedData;
};

// accounts for all capital letters with underscore
const cleanString = (str) => {
  let string = [];
  const convertedStr = str && str.toLowerCase().replace(/_/g, ' ').split(' ');
  for (let word of convertedStr) {
    string.push(word[0].toUpperCase() + word.slice(1));
  }

  return string.join(' ');
};

const cleanNumber = (num) => {
  return parseFloat(num.replace(/[^0-9.-]+/g, ''));
};

export const commaSep = (num) => {
  let num_parts = num.toString().split('.');
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num_parts.join('.');
};

//go through array of objects, and filters out and gives me years only. no duplicates
export const getYearList = (array) => {
  return [...new Set(array.map((element) => element['Order Year']))];
};

//filter data by year
export const filteredYear = (array, chosenYear) => {
  let pickedYear =
    array && array.filter((yr) => yr['Order Year'] === chosenYear);
  return pickedYear;
};

//takes in array, iterates and find max number based on columnName
export const maxTotalAmount = (array, columnName) => {
  return commaSep(
    Math.max
      .apply(
        Math,
        array.map((element) => element[columnName])
      )
      .toFixed(2)
  );
};

//takes in array, searches through column and returns amount that matches amount argument
export const itemOfTotal = (array, columnName, amount) => {
  return array.filter((x) => x[columnName] == amount);
};

export const minTotalAmount = (array, columnName) => {
  let filterZero = array.filter((x) => x[columnName] > 0);

  return commaSep(
    Math.min
      .apply(
        Math,
        filterZero.map((element) => element[columnName])
      )
      .toFixed(2)
  );
};

//sums up array of objects returns columnName: totalAmount
export const sumColumn = (array, columnName) => {
  return array.reduce((a, b) => ({
    [columnName]: a[columnName] + b[columnName],
  }))[columnName];
};

//sums up each type of value returns object of summed up values {value: count}
export const countPerItem = (array, columnName) => {
  return (
    array &&
    array.reduce((acc, cur) => {
      acc[cur[columnName]] = acc[cur[columnName]] + 1 || 1;
      return acc;
    }, {})
  );
};

//finds largest value in single object
export const largestItem = (obj) => {
  return Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
};

export const NumberAnimate = (props, decimal = 0) => {
  let formatValue = (value) => value.toFixed(decimal);
  return (
    <AnimatedNumber value={props} formatValue={formatValue} duration={500} />
  );
};
