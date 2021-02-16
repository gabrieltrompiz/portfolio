import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import '@styles/main.scss';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import SideLink from '@components/SideLink';
import Head from 'next/head';
import CanvasWebGL from '@components/CanvasWebGL';
import { pages, sideLinkContainer } from '@utils/variants';
import { useGesture } from 'react-use-gesture';
import { handleScroll } from '@utils/events';
import { FontLoader, LoadingManager, TextureLoader } from 'three';
import { useStore } from '@redux/store';
import {  Provider, useDispatch, useSelector } from 'react-redux';
import { addTexture } from '@redux/actions/projects';
import { State } from 'portfolio';

const AppComponent: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [loading, setLoading] = useState(true);

  const isAbout = router.route === '/about';

  const dispatch = useDispatch();
  const projects = useSelector((state: State) => state.projects);

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

  const setUpManagers = (loader: LoadingManager) => {
    loader.onProgress = (...args) => {
      // do something
    };
    loader.onLoad = () => {
      setLoading(false);
      controls.start('enter');
    };
  };

  const startLoading = async (textureLoader: TextureLoader) => {
    projects.forEach(project => {
      project.assets.forEach(async (asset) => {
        const params = new URLSearchParams();
        params.set('url', asset.url);
        params.set('w', asset.w.toString());
        params.set('q', asset.q.toString());
        const texture = await textureLoader.loadAsync(`/_next/image?${params}`);
        dispatch(addTexture(texture, project.id));
      })
    })
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    const loader = new LoadingManager();
    const textureLoader = new TextureLoader(loader);

    setUpManagers(loader);
    startLoading(textureLoader);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    }
  }, []);

  return !loading && (
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
};

const StoreWrapper: React.FC<AppProps> = (props) => {
  const store = useStore();

  return (
    <Provider store={store}>
      <AppComponent {...props} />
    </Provider>
  );
};

export default StoreWrapper;