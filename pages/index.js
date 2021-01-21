import Head from 'next/head';
import { useState } from 'react';
import { CategoryChart } from '../components/Charts/CategoryChart';
import CalendarChart from '../components/Charts/CalendarChart';
import { MonthlyChart } from '../components/Charts/MonthlyChart';
import { Summary } from '../components/Charts/Summary';
import { DataTable } from '../components/Charts/MaterialTable';
import { WelcomeModal } from '../components/Welcome/WelcomeComponent';

export default function Home() {
  const [data, setData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [year, setYear] = useState('2020');

  const handleNewData = (payload) => {
    setData(payload);
  };

  const handleYearList = (payload) => {
    setYearList(payload);
  };

  const handleYear = (payload) => {
    setYear(payload);
  };

  let displayYearList = yearList.map((yr, idx) => (
    <button
      key={idx}
      className='chart-year-buttons__button'
      onFocus={() => handleYear(yr)}
      onClick={() => handleYear(yr)}
    >
      {yr}
    </button>
  ));

  const props = {
    data: data,
    year: year,
    handleYear: handleYear,
  };

  return (
    <>
      <html lang='en-US' />
      <Head>
        <title>Amazonion</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content="Amazon Order's Data Visualizer Application"
        />
      </Head>

      <main className='container'>
        <WelcomeModal
          handleNewData={handleNewData}
          handleYearList={handleYearList}
          data={data}
        />
        {data.length > 0 && (
          <>
            <CategoryChart {...props} />
            <MonthlyChart {...props} />
            <CalendarChart {...props} />
            <Summary {...props} />
            <section className='chart-year-buttons'>{displayYearList}</section>
          </>
        )}
      </main>
      {data.length > 0 && (
        <section className='table-container'>
          <DataTable {...props} />
        </section>
      )}
    </>
  );
}
