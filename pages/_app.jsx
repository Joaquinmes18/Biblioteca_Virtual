import '../src/index.css';
import '../src/App.css';
import Navbar from '../src/components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
