import { AppProps } from 'next/app';
import '@styles/main.scss';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App;
