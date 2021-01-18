import Head from 'next/head';
import { useState } from 'react';
import ChartComponent from '../components/ChartComponent';
import WelcomeModal from '../components/WelcomeComponent';

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
            <ChartComponent
              data={data}
              yearList={yearList}
              year={year}
              handleYear={handleYear}
            />
            <section className='chart-year-buttons'>{displayYearList}</section>
          </>
        )}
      </main>
    </>
  );
}
