import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: 'hack',
    value: 373,
  },
  {
    id: 'erlang',
    value: 191,
  },
  {
    id: 'java',
    value: 241,
  },
  {
    id: 'sass',
    value: 252,
  },
  {
    id: 'javascript',
    value: 502,
  },
  {
    id: 'javascript',
    value: 502,
  },
  {
    id: 'money',
    value: 502,
  },
];

export const CategoryChart = ({ year }) => {
  //   Based on year, give me reduced category of items. [{id: category, value: totalOfItemsPerCategory}]
  // 1. filter data to give only Date, category, item total, quantity
  // 2. from that filter reduce to each category, item total, quantity by year
  // 3. from that give me each category and item total * quantity, and year
  // 4. display data based on each year.

  return (
    <section className='pie-chart' style={{ height: '600px', width: '600px' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'oranges' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor='#333333'
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor='#333333'
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 60,
            itemHeight: 14,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 14,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </section>
  );
};
