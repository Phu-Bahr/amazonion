import dayjs from 'dayjs';

// accounts for all capital letters with underscore
const cleanString = (str) => {
  let string = [];
  const convertedStr = str && str.toLowerCase().replace(/_/g, ' ').split(' ');
  for (let word of convertedStr) {
    string.push(word[0].toUpperCase() + word.slice(1));
  }

  return string.join(' ');
};

//converts Order Date from 1/2/19 => 1/2019, Item Total from '$150.45' to 150.45
export const convertData = (array) => {
  let newArray;
  //slice is to return entire array but last empty row
  array ? (newArray = array.data.slice(0, -1)) : (newArray = null);

  let convertedData = newArray.map((x) => ({
    ...x,
    'Order Date': dayjs(x['Order Date']).format('MMM/YYYY'),
    'Order Year': dayjs(x['Order Date']).format('YYYY'),
    'Item Total': parseFloat(x['Item Total'].replace(/[^0-9.-]+/g, '')),
    Quantity: parseFloat(x['Quantity'].replace(/[^0-9.-]+/g, '')),
    Category:
      cleanString(x['Category']) == '' ? 'Misc' : cleanString(x['Category']),
  }));

  return convertedData;
};

//go through array of objects, and filters out and gives me years only. no duplicates
export const getYearList = (array) => {
  return [...new Set(array.map((element) => element['Order Year']))];
};
