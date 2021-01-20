import { filteredYear, CommaFormatted, getYearList } from '../../util/tools';

export const Summary = ({ data, year }) => {
  //  incase there's more than 1 buyer, choose bigger buyer
  // const buyerName =
  //   data &&
  //   data.reduce((acc, cur) => {
  //     acc[cur['Buyer Name']] =
  //       acc[cur['Buyer Name']] + cur['Quantity'] || cur['Quantity'];
  //     return acc;
  //   }, {});

  const buyerName = data && data[0]['Buyer Name'].split(' ').shift();

  const maxSpentPerYear = CommaFormatted(
    filteredYear(data, year)
      .reduce((a, b) => ({
        'Item Total': a['Item Total'] + b['Item Total'],
      }))
      ['Item Total'].toFixed(2)
  );

  const totalSpent = CommaFormatted(
    data
      .reduce((a, b) => ({
        'Item Total': a['Item Total'] + b['Item Total'],
      }))
      ['Item Total'].toFixed(2)
  );

  const totalYears = getYearList(data).length;

  //find highest number category occurred
  const mostExpensiveItemTotal = Math.max.apply(
    Math,
    filteredYear(data, year).map((o) => o['Item Total'])
  );

  //find highest category occured
  const mostExpensiveItem = filteredYear(data, year).filter(
    (x) => x['Item Total'] == mostExpensiveItemTotal
  );

  console.log(mostExpensiveItemTotal);
  console.log(mostExpensiveItem);
  return (
    <section className='summary'>
      <h2 className='summary-heading'>Your Amazon Life...</h2>
      <p className='summary-details'>
        Hi {buyerName}, you have quite the spending habit. In {year}, you spent
        a whopping total of ${maxSpentPerYear}. Your big ticket item was{' '}
        <em>{mostExpensiveItem[0]['Title']}</em>" for ${mostExpensiveItemTotal}.
      </p>
      <p>
        Overall, you spent a total of ${totalSpent} on amazon products within
        the last {totalYears} years.
      </p>
    </section>
  );
};
