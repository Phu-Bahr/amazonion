import { ResponsiveCalendar } from '@nivo/calendar';

export const HeatMapChart = ({ data, year }) => {
  console.log(data[0]);

  const calendarData =
    data &&
    data.map((item) => {
      let newObject = [];
      newObject = {
        ...newObject,
        day: item['Heat Date'],
        value: item['Item Total'],
      };
      return newObject;
    });

  console.log('cal', calendarData);
  return (
    <section className='heatmap'>
      <h2 className='heatmap__header'>
        <span>{year} </span>
        <span>Spent Per Day</span>
      </h2>

      <ResponsiveCalendar
        data={calendarData}
        margin={{ top: 40, right: 40, bottom: 50, left: 40 }}
        from={`${year}-01-10`}
        to={`${year}-12-20`}
        maxValue={100}
        emptyColor='#eeeeee'
        colors={['#7FFFCB', '#FFD391', '#ff9900', '#ff4500', '#DC143C']}
        minValue={1}
        yearSpacing={20}
        monthBorderColor='#ffffff'
        dayBorderWidth={2}
        dayBorderColor='#ffffff'
        legends={[
          {
            anchor: 'center',
            direction: 'row',
            translateY: 30,
            translateX: 100,
            itemCount: 4,
            itemWidth: 35,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
          },
        ]}
      />
    </section>
  );
};

export default HeatMapChart;
