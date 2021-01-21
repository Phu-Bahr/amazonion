import dayjs from 'dayjs';
import {
  filteredYear,
  getYearList,
  maxTotalAmount,
  itemOfTotal,
  commaSep,
  minTotalAmount,
  sumColumn,
  countPerItem,
  largestItem,
  NumberAnimate,
} from '../../util/tools';

export const Summary = ({ data, year }) => {
  const buyerName = data && data[0]['Buyer Name'].split(' ').shift();

  const totalYears = getYearList(data).length;

  ////////////////yearly
  //adds up all the item totals based on year filter
  const maxSpentPerYear = filteredYear(data, year)
    .reduce((a, b) => ({
      'Item Total': a['Item Total'] + b['Item Total'],
    }))
    ['Item Total'].toFixed(2);

  const mostExpensiveItemTotal = maxTotalAmount(
    filteredYear(data, year),
    'Purchase Price Per Unit'
  );

  const mostExpensiveItem = itemOfTotal(
    filteredYear(data, year),
    'Purchase Price Per Unit',
    mostExpensiveItemTotal
  )[0]['Title'];

  const cheapestItemTotal = minTotalAmount(
    filteredYear(data, year),
    'Purchase Price Per Unit'
  );

  const cheapestItem = itemOfTotal(
    filteredYear(data, year),
    'Purchase Price Per Unit',
    cheapestItemTotal
  )[0]['Title'];

  const yearlyAverageSaved = () => {
    let listPriceYear = sumColumn(
      filteredYear(data, year),
      'List Price Per Unit'
    );
    let purchasePriceYear = sumColumn(
      filteredYear(data, year),
      'Purchase Price Per Unit'
    );
    let average = ((listPriceYear - purchasePriceYear) / listPriceYear) * 100;

    return average.toFixed(0);
  };

  const maxDayYearly = parseInt(
    largestItem(countPerItem(filteredYear(data, year), 'Day of Week'))
  );

  //////////////////////// all time
  //iterates through all the item totals based on data array
  const totalSpent = commaSep(
    data
      .reduce((a, b) => ({
        'Item Total': a['Item Total'] + b['Item Total'],
      }))
      ['Item Total'].toFixed(2)
  );

  const allTimeExpensiveItemTotal = maxTotalAmount(
    data,
    'Purchase Price Per Unit'
  );

  const allTimeExpensiveItem = itemOfTotal(
    data,
    'Purchase Price Per Unit',
    allTimeExpensiveItemTotal
  )[0]['Title'];

  const allTimeCheapestItemTotal = minTotalAmount(
    data,
    'Purchase Price Per Unit'
  );

  const allTimeCheapestItem = itemOfTotal(
    data,
    'Purchase Price Per Unit',
    allTimeCheapestItemTotal
  )[0]['Title'];

  const allTimeAverageSaved = () => {
    let listPrice = sumColumn(data, 'List Price Per Unit');
    let purchasePrice = sumColumn(data, 'Purchase Price Per Unit');
    let average = ((listPrice - purchasePrice) / listPrice) * 100;

    return average.toFixed(0);
  };

  const maxDay = parseInt(largestItem(countPerItem(data, 'Day of Week')));
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <section className='summary'>
      <h2 className='summary__heading'>
        Your <span className='summary__heading--span'>Amazon</span> Life...
      </h2>
      <div className='summary__details'>
        <p className='summary__details--yearly'>
          Hi {buyerName}, you have quite the spending habit. In{' '}
          <span>{NumberAnimate(year)}</span>, you spent a whopping total of{' '}
          <span>${NumberAnimate(maxSpentPerYear, 2)}</span>. Your big ticket
          item was <span>{mostExpensiveItem}</span>, for{' '}
          <span>${NumberAnimate(mostExpensiveItemTotal, 2)}</span>. Your
          cheapest item was <span>{cheapestItem}</span> for{' '}
          <span>${NumberAnimate(cheapestItemTotal, 2)}</span>. You saved on
          average <span>{NumberAnimate(yearlyAverageSaved())}%</span> based on
          List vs Purchase Price purchase. You like to shop on{' '}
          <span>{daysOfWeek[maxDayYearly]}s</span>.
        </p>

        <p className='summary__details--overall'>
          Overall, you spent a total of ${totalSpent} on amazon products within
          the last {totalYears} years. The biggest ticket was{' '}
          <em>{allTimeExpensiveItem}</em> for ${allTimeExpensiveItemTotal}.
          Cheapest, <em>{allTimeCheapestItem}</em> for $
          {allTimeCheapestItemTotal}. You saved an average of{' '}
          {allTimeAverageSaved()}% based on lifetime purchases. You like to buy
          things on {daysOfWeek[maxDay]}.
        </p>
      </div>
    </section>
  );
};
