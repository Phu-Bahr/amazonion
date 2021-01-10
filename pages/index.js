import Head from 'next/head';
import { useState } from 'react';
import ChartComponent from '../components/ChartComponent';
import Dropzone from '../components/Dropzone';

export default function Home() {
  const [data, setData] = useState([]);

  const handleNewData = (payload) => {
    setData(payload);
  };

  // console.log(data);
  // console.table(data.data);

  return (
    <div>
      <Head>
        <title>Amazonion</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container'>
        <Dropzone handleNewData={handleNewData} data={data} />
        <ChartComponent data={data} />
      </main>
    </div>
  );
}
