import dayjs from 'dayjs';

//converts Order Date from 1/2/19 => 1/2019, Item Total from '$150.45' to 150.45
export const convertData = (array) => {
  let newArray;
  array ? (newArray = array.data) : (newArray = null);

  let convertedDate = newArray.map((x) => ({
    ...x,
    'Order Date': dayjs(x['Order Date']).format('MMM/YYYY'),
    'Item Total': parseFloat(x['Item Total'].replace(/[^0-9.-]+/g, '')),
  }));

  return convertedDate;
};
