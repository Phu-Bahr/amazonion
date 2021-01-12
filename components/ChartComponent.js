import { ResponsiveLine } from '@nivo/line';
import { useState } from 'react';

export default function ChartComponent(data) {
  const [year, setYear] = useState('2020');

  //filters the months by year
  const filteredYear = (array, year) => {
    let pickedYear = array.filter((yr) => yr.year == year);
    return pickedYear;
  };

  //data for the chart
  const yearData = [
    {
      id: 'Year',
      color: 'hsl(336, 70%, 50%)',
      data: filteredYear(data.data, year),
    },
  ];

  // get list of years
  const yearList = data.data.map((element) => {
    return element.year;
  });

  // remove dupes from list yearList
  const reducedYearList = [...new Set(yearList)];

  let displayYearList = reducedYearList.map((yr, idx) => (
    <button
      key={idx}
      className='chart-year-buttons__button'
      onFocus={() => handleChangeYear(yr)}
    >
      {yr}
    </button>
  ));

  //onclick to change state of year
  const handleChangeYear = (yr) => {
    setYear(yr);
  };

  //   //get max per year
  //   const maxSpentPerYear =
  //   filteredYear(coordinates, year).length == 0
  //     ? 1
  //     : filteredYear(coordinates, year).reduce(function (prev, current) {
  //         return prev.y > current.y ? prev : current;
  //       });

  // //supply max per year to yscale max
  // const maxValue = (curMaxNum) => {
  //   let padding;
  //   if (curMaxNum <= 10) {
  //     padding = 10;
  //   } else if (curMaxNum > 10 && curMaxNum <= 1000) {
  //     padding = 100;
  //   } else {
  //     padding = 1000;
  //   }
  //   return Math.ceil(curMaxNum / padding) * padding;
  // };

  return (
    <section className='chart'>
      <ResponsiveLine
        data={yearData}
        margin={{ top: 50, right: 110, bottom: 50, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: '0',
          max: 'auto',
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
          legend: 'Month',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Total Spent',
          legendOffset: -40,
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
      <section className='chart-year-buttons'>{displayYearList}</section>
    </section>
  );
}
