import { ResponsiveLine } from '@nivo/line';

export default function ChartComponent({ data, year }) {
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
      id: 'Year',
      color: 'hsl(336, 70%, 50%)',
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

  return (
    <section className='chart'>
      <ResponsiveLine
        data={yearData}
        margin={{ top: 50, right: 110, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '0',
          max: maxValue(maxSpentPerYear.y),
          stacked: false,
          reverse: false,
        }}
        yFormat=' >-.2f'
        curve='natural'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: `Months for ${year}`,
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
        motionConfig={'wobbly'}
        enablePointLabel={true}
        enableArea={true}
        enableGridX={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </section>
  );
}
