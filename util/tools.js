import dayjs from 'dayjs';

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
    'Item Total': cleanNumber(x['Item Total']),
    'Purchase Price Per Unit': cleanNumber(x['Purchase Price Per Unit']),
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
export const maxTotalItem = (array, columnName, amount) => {
  return array.filter((x) => x[columnName] == amount);
};
