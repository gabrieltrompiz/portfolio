import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import '@styles/main.scss';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import SideLink from '@components/SideLink';
import Head from 'next/head';
import CanvasWebGL from '@components/CanvasWebGL';
import { pages, sideLinkContainer } from '@utils/variants';
import { useGesture } from 'react-use-gesture';
import { handleScroll } from '@utils/events';

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const isAbout = router.route === '/about';

  const controls = useAnimation();
  const bind = useGesture({
    onWheel: (e) => handleScroll(e, router),
    onDrag: (e) => handleScroll(e, router)
  });

  const handleRouteChange = (url: string) => {
    controls.start('enter');
    switch(url) {
      case '/projects': 
        controls.start('goToProjects');
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    controls.start('enter');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Gabriel Trompiz - Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CanvasWebGL wireframe={router.route !== '/'} router={router} />
      <AnimatePresence>
        <motion.div key={`overlay-${isAbout}`} id='overlay' exit='exit' initial='initial' animate={controls} variants={sideLinkContainer}>
          <SideLink href='mailto:hello@gabrieltrompiz.com?subject=Hello Gabriel'>
            hello@gabrieltrompiz.com
          </SideLink>
          <SideLink onClick={() => router.push(isAbout ? '/' : '/about')}>
            {isAbout ? 'Back' : 'About me'}
          </SideLink>
        </motion.div>
        <motion.div key={router.route} custom={router.route} id='wrapper' exit='exit' initial='initial' animate={controls} variants={pages} {...bind()}>
          <Component {...pageProps} key={router.route} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default App;