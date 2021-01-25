import React from 'react';
import Introduction from '@components/Introduction';
import { useRouter } from 'next/dist/client/router';
import SideLink from '@components/SideLink';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div id='home'>
      <SideLink href='mailto:hello@gabrieltrompiz.com?subject=Hello Gabriel'>
        hello@gabrieltrompiz.com
      </SideLink>
      <Introduction />
      <SideLink onClick={() => router.push('/about')}>
        About me
      </SideLink>
    </div>
  );
};

export default Home;