import { ResponsivePie } from '@nivo/pie';

export const CategoryChart = ({ data, year }) => {
  //   Based on year, give me reduced category of items. [{id: category, value: totalOfItemsPerCategory}]
  // DONE 1. clean up category in util, lower case and take out underscores, quantity to whole number
  // DONE 2. filter data to give only Date, category, item total, quantity
  // DONE 3. from that filter reduce to each category, item total, quantity by year
  // DONE 4. from that give me each category and item total * quantity, and year
  // DONE 5. display data based on each year.

  //gives me new data [{Order Year, Category, Item Total, Quantity}]
  const categoryData =
    data &&
    data.map((item) => {
      let newObject = [];
      newObject = {
        ...newObject,
        'Order Year': item['Order Year'],
        Category: item['Category'],
        Quantity: item['Quantity'],
        'Item Total': item['Item Total'],
        Title: item['Title'],
      };
      return newObject;
    });

  //convert to data pie can read
  const categoriesPerYear = (array, chosenYear) => {
    //filter by year, then reduce all categories by quantity
    const sumQuantityPerCategory =
      array &&
      array
        .filter((yr) => yr['Order Year'] === chosenYear)
        .reduce((objectHolder, currentObj) => {
          objectHolder[currentObj['Category']] =
            objectHolder[currentObj['Category']] + currentObj['Quantity'] ||
            currentObj['Quantity'];
          return objectHolder;
        }, {});

    //dealing with only single category years
    const filteredByValue =
      //if atleast 1 category reduced is greater than 1
      Object.entries(sumQuantityPerCategory).some(([key, value]) => value > 1)
        ? //goes through each object, using key/value filter out values greater than 1
          Object.fromEntries(
            Object.entries(sumQuantityPerCategory).filter(
              ([key, value]) => value > 1
            )
          )
        : sumQuantityPerCategory;

    // taking reduction and conforming to objects with id and value format.
    const convertSumForPie =
      filteredByValue &&
      Object.entries(filteredByValue).map(([key, value]) => {
        if (key == '') {
          key = 'Misc';
        }
        return {
          id: key,
          value: value,
        };
      });

    return convertSumForPie;
  };

  //find highest number category occurred
  const max = Math.max.apply(
    Math,
    categoriesPerYear(categoryData, year).map((o) => o.value)
  );

  //find highest category occured
  const popularCategory = categoriesPerYear(categoryData, year).filter(
    (x) => x.value == max
  );

  let num = 2;
  return (
    <section className='pie-chart'>
      <ResponsivePie
        data={categoriesPerYear(categoryData, year)}
        // margin={{ top: 10, right: 200, bottom: 0, left: 0 }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'oranges' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={7}
        radialLabelsTextColor='#333333'
        radialLabelsLinkColor={{ from: 'color' }}
        radialLabelsLinkHorizontalLength={10}
        radialLabelsLinkDiagonalLength={10}
        sliceLabelsSkipAngle={7}
        sliceLabelsTextColor='#333333'
      />
      <div className='pie-chart__details'>
        <span className='pie-chart__details--header'>Most Popular</span>
        <span className='pie-chart__details--header'>Category</span>
        <span className='pie-chart__details--number'>{max}</span>
        <span className='pie-chart__details--detail'>
          {popularCategory[0] && popularCategory[0]['id']}
        </span>
      </div>
    </section>
  );
};
