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
    'Calendar Date': dayjs(x['Order Date']).format('YYYY-MM-DD'),
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

//filter data by year
export const filteredYear = (array, chosenYear) => {
  let pickedYear =
    array && array.filter((yr) => yr['Order Year'] === chosenYear);
  return pickedYear;
};

export const CommaFormatted = (amount) => {
  var delimiter = ','; // replace comma if desired
  var a = amount.split('.', 2);
  var d = a[1];
  var i = parseInt(a[0]);
  if (isNaN(i)) {
    return '';
  }
  var minus = '';
  if (i < 0) {
    minus = '-';
  }
  i = Math.abs(i);
  var n = new String(i);
  var a = [];
  while (n.length > 3) {
    var nn = n.substr(n.length - 3);
    a.unshift(nn);
    n = n.substr(0, n.length - 3);
  }
  if (n.length > 0) {
    a.unshift(n);
  }
  n = a.join(delimiter);
  if (d.length < 1) {
    amount = n;
  } else {
    amount = n + '.' + d;
  }
  amount = minus + amount;
  return amount;
};
