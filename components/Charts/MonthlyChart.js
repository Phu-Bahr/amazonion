import { ResponsiveLine } from '@nivo/line';
import {
  filteredYear,
  getYearList,
  maxTotalAmount,
  itemOfTotal,
  commaSep,
  minTotalAmount,
  sumColumn,
} from '../../util/tools';

export const MonthlyChart = ({ data, year }) => {
  //sum up each month per year Jan/2011: $500.00, Jan/2012: $400.00
  const sumPerMonth =
    data &&
    data.reduce((acc, cur) => {
      acc[cur['Order Date']] =
        acc[cur['Order Date']] + cur['Item Total'] || cur['Item Total'];
      return acc;
    }, {});

  //convert each summed up month to x y cordinates. month: value => x: month, y: value, year: year
  const coordinates = !sumPerMonth
    ? [{ x: 'Jan', y: 1, year: '2020' }]
    : Object.entries(sumPerMonth).map(([key, value]) => {
        return {
          x: key.split('/').shift(),
          y: value,
          year: key.split('/').pop(),
        };
      });

  //filters the months by year to be used in yearData
  const filteredYear = (array, chosenYear) => {
    let pickedYear = array && array.filter((yr) => yr.year === chosenYear);
    return pickedYear;
  };

  //data for the chart
  const yearData = [
    {
      id: 'Month Total',
      data: filteredYear(coordinates, year),
    },
  ];

  //get max per year
  const maxSpentPerYear =
    filteredYear(coordinates, year).length == 0
      ? 1
      : filteredYear(coordinates, year).reduce(function (prev, current) {
          return prev.y > current.y ? prev : current;
        });

  //supply max per year to yscale max
  const maxValue = (curMaxNum) => {
    let padding;
    if (curMaxNum <= 10) {
      padding = 10;
    } else if (curMaxNum > 10 && curMaxNum <= 1000) {
      padding = 100;
    } else {
      padding = 1000;
    }
    return Math.ceil(curMaxNum / padding) * padding;
  };

  console.log(maxSpentPerYear.y);

  return (
    <section className='chart'>
      <ResponsiveLine
        data={yearData}
        margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '0',
          max: maxValue(maxSpentPerYear.y),
          stacked: false,
          reverse: false,
        }}
        yFormat=' >-$,.2f'
        curve='natural'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `Total Spent per Month - Max Spent $${maxSpentPerYear.y} in ${year}`,
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 15,
          tickRotation: 0,
          legend: 'Total Spent',
          legendOffset: -55,
          legendPosition: 'middle',
          format: (v) => `$${v}`,
        }}
        lineWidth={4}
        enableSlices='x'
        motionConfig={'wobbly'}
        enablePointLabel={true}
        enableArea={true}
        areaOpacity={0.4}
        colors={'#ff9900'}
        enableGridX={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </section>
  );
};
