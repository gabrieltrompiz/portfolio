import React from 'react';
import Head from 'next/head';
import Introduction from '@components/Introduction';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Gabriel Trompiz - Developer</title>
      </Head>
      <div className='flex-full'>
        <Introduction />
      </div>
    </>
  );
};

export default Home;