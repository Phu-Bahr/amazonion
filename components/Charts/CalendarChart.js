import { ResponsiveCalendar } from '@nivo/calendar';
import dayjs from 'dayjs';

export const CalendarChart = ({ data, year }) => {
  console.log(data[0]);

  const calendarData =
    data &&
    data.map((item) => {
      let newObject = [];
      newObject = {
        ...newObject,
        day: item['Calendar Date'],
        value: item['Item Total'],
      };
      return newObject;
    });

  const maxDate = (array, chosenYear) => {
    const summedItems =
      array &&
      array
        .filter((yr) => yr['Order Year'] === chosenYear)
        .reduce((placeholder, currentObj) => {
          placeholder[currentObj['Calendar Date']] =
            placeholder[currentObj['Calendar Date']] +
              currentObj['Item Total'] || currentObj['Item Total'];
          return placeholder;
        }, {});

    const maxDay =
      summedItems &&
      Object.keys(summedItems).reduce((a, b) =>
        summedItems[a] > summedItems[b] ? a : b
      );

    const maxAmount =
      summedItems && (Math.max(...Object.values(summedItems)) * 100) / 100;

    const obj = { maxDay: maxDay, maxAmount: maxAmount };

    return obj;
  };

  let expensiveDate = maxDate(data, year);

  const CustomTooltip = (data) => {
    const convertedDate = dayjs(data.day).format('MMM DD');
    const convertedValue = data.value && data.value.toFixed(2);
    if (data.value === undefined) return null;
    return (
      <span
        style={{ color: 'black', backgroundColor: 'white', padding: '10px' }}
      >
        {convertedDate} &rarr; <strong>${convertedValue}</strong>
      </span>
    );
  };

  return (
    <section className='calendar'>
      <h2 className='calendar__header'>
        <span>{year} </span>
        <span>Spending Days</span>
      </h2>

      <ResponsiveCalendar
        data={calendarData}
        tooltip={CustomTooltip}
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

export default CalendarChart;
