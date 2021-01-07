import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'japan',
    color: 'hsl(336, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 269,
      },
      {
        x: 'helicopter',
        y: 211,
      },
      {
        x: 'boat',
        y: 81,
      },
      {
        x: 'train',
        y: 41,
      },
      {
        x: 'subway',
        y: 105,
      },
      {
        x: 'bus',
        y: 246,
      },
      {
        x: 'car',
        y: 244,
      },
      {
        x: 'moto',
        y: 149,
      },
      {
        x: 'bicycle',
        y: 176,
      },
      {
        x: 'horse',
        y: 216,
      },
      {
        x: 'skateboard',
        y: 105,
      },
      {
        x: 'others',
        y: 143,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(48, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 200,
      },
      {
        x: 'helicopter',
        y: 239,
      },
      {
        x: 'boat',
        y: 163,
      },
      {
        x: 'train',
        y: 282,
      },
      {
        x: 'subway',
        y: 107,
      },
      {
        x: 'bus',
        y: 59,
      },
      {
        x: 'car',
        y: 46,
      },
      {
        x: 'moto',
        y: 190,
      },
      {
        x: 'bicycle',
        y: 79,
      },
      {
        x: 'horse',
        y: 165,
      },
      {
        x: 'skateboard',
        y: 208,
      },
      {
        x: 'others',
        y: 179,
      },
    ],
  },
];

export default function ChartComponent() {
  return (
    <div className='chart'>
      HELLLOOOOO
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=' >-.2f'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'transportation',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
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
      <style jsx>
        {`
          .chart {
            height: 50vh;
            width: 60vw;
            background: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            transition: 0.3s;
          }

          .chart:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
}
