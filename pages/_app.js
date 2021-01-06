import '../styles/globals.scss';

//global.scss can only be imported here and only 1 global scss file can exist, the rest needs to be moddules
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
