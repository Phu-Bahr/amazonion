import {
  filteredYear,
  getYearList,
  maxTotalAmount,
  maxTotalItem,
  commaSep,
} from '../../util/tools';

export const Summary = ({ data, year }) => {
  const buyerName = data && data[0]['Buyer Name'].split(' ').shift();

  const totalYears = getYearList(data).length;

  //adds up all the item totals based on year filter
  const maxSpentPerYear = commaSep(
    filteredYear(data, year)
      .reduce((a, b) => ({
        'Item Total': a['Item Total'] + b['Item Total'],
      }))
      ['Item Total'].toFixed(2)
  );

  //iterates through all the item totals based on data array
  const totalSpent = commaSep(
    data
      .reduce((a, b) => ({
        'Item Total': a['Item Total'] + b['Item Total'],
      }))
      ['Item Total'].toFixed(2)
  );

  const mostExpensiveItemTotal = maxTotalAmount(
    filteredYear(data, year),
    'Purchase Price Per Unit'
  );

  const mostExpensiveItem = maxTotalItem(
    filteredYear(data, year),
    'Purchase Price Per Unit',
    mostExpensiveItemTotal
  );

  const allTimeExpensiveItemTotal = maxTotalAmount(
    data,
    'Purchase Price Per Unit'
  );

  const allTimeExpensiveItem = maxTotalItem(
    data,
    'Purchase Price Per Unit',
    allTimeExpensiveItemTotal
  );

  return (
    <section className='summary'>
      <h2 className='summary__heading'>
        Your <span className='summary__heading--span'>Amazon</span> Life...
      </h2>
      <div className='summary__details'>
        <p className='summary__details--yearly'>
          Hi {buyerName}, you have quite the spending habit. In {year}, you
          spent a whopping total of ${maxSpentPerYear}. Your big ticket item was{' '}
          <em>{mostExpensiveItem[0]['Title']}</em>, for $
          {mostExpensiveItemTotal}.
        </p>

        <p className='summary__details--overall'>
          Overall, you spent a total of ${totalSpent} on amazon products within
          the last {totalYears} years. Biggest ticket was{' '}
          <em>{allTimeExpensiveItem[0]['Title']}</em> for $
          {allTimeExpensiveItemTotal}
        </p>
      </div>
    </section>
  );
};
