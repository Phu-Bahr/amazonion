import Head from 'next/head';
import { useState } from 'react';
import ChartComponent from '../components/ChartComponent';
import WelcomeModal from '../components/WelcomeComponent';

export default function Home() {
  const [data, setData] = useState([]);

  const handleNewData = (payload) => {
    setData(payload);
  };

  return (
    <div>
      <Head>
        <title>Amazonion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container'>
        {data.length == 0 ? (
          <WelcomeModal handleNewData={handleNewData} data={data} />
        ) : (
          <ChartComponent data={data} />
        )}
      </main>
    </div>
  );
}
