import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container'>main content</main>

      <footer>
        <div>footer</div>
      </footer>
    </div>
  );
}
