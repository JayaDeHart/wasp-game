import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../app/store';
import Socket from '../context/socketContext';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Socket>
        <Component {...pageProps} />
      </Socket>
    </Provider>
  );
}

export default MyApp;
