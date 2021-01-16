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
    <div>
      <Head>
        <title>Amazonion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container'>
        {data.length == 0 ? (
          <WelcomeModal
            handleNewData={handleNewData}
            handleYearList={handleYearList}
            data={data}
          />
        ) : (
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
    </div>
  );
}
