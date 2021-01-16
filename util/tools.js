// import dayjs from 'dayjs';

// //converts Order Date from 1/2/19 => 1/2019, Item Total from '$150.45' to 150.45
// export const convertData = (array) => {
//   let newArray;
//   array ? (newArray = array.data.slice(0, -1)) : (newArray = null);
//   console.log(newArray);
//   let convertedDate = newArray.map((x) => {
//     x['Item Total'] === undefined
//       ? console.log(x['Order Date'])
//       : console.log(x['Item Total']);
//   });

//   return convertedDate;
// };

import dayjs from 'dayjs';

//converts Order Date from 1/2/19 => 1/2019, Item Total from '$150.45' to 150.45
export const convertData = (array) => {
  let newArray;
  //slice is to return entire array but last empty row
  array ? (newArray = array.data.slice(0, -1)) : (newArray = null);

  let convertedDate = newArray.map((x) => ({
    ...x,
    'Order Date': dayjs(x['Order Date']).format('MMM/YYYY'),
    'Item Total': parseFloat(x['Item Total'].replace(/[^0-9.-]+/g, '')),
  }));

  return convertedDate;
};
