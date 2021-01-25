import { AppProps } from 'next/app';
import '@styles/main.scss';
import Background from '@components/Background';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Background />
      <Component {...pageProps} />
    </>
  )
}

export default App;
