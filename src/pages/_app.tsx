import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import '@styles/main.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import CanvasWebGL from '@components/CanvasWebGL';
import { useGesture } from 'react-use-gesture';
import { handleScroll } from '@utils/events';
import { LoadingManager, TextureLoader } from 'three';
import { useStore } from '@redux/store';
import {  Provider, useDispatch, useSelector } from 'react-redux';
import { addTexture, resetSelectedProject } from '@redux/actions/projects';
import { State } from 'portfolio';
import AboutOverlay from '@components/AboutOverlay';

const AppComponent: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const projects = useSelector((state: State) => state.projects);
  const movingSB = useSelector((state: State) => state.movingScrollBar);
  const selectedProject = useSelector((state: State) => state.selectedProject);

  const bind = useGesture({
    onWheel: (e) => {
      if(!movingSB) {
        handleScroll(e, router, dispatch);
      }
    },
    onDrag: (e) => {
      if(!movingSB) {
        handleScroll(e, router, dispatch);
      }
    }
  });

  const setUpManagers = (loader: LoadingManager) => {
    loader.onProgress = (...args) => {
      // do something
    };
    loader.onLoad = () => {
      setLoading(false);
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
    const loader = new LoadingManager();
    const textureLoader = new TextureLoader(loader);

    setUpManagers(loader);
    startLoading(textureLoader);
  }, []);

  useEffect(() => {
    const onRouteChange = (url) => {
      if(url !== '/projects') {
        setTimeout(() => dispatch(resetSelectedProject()), 1000);
      }
    }

    router.events.on('routeChangeStart', onRouteChange);

    return () => router.events.off('routeChangeStart', onRouteChange);
  }, [])

  return (
    <>
      <Head>
        <title>Gabriel Trompiz - Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CanvasWebGL wireframe={router.route !== '/'} router={router} loading={loading} />
      <AnimatePresence>
        <AboutOverlay color={selectedProject.titleColor} router={router} />
        <motion.div key={router.route} custom={router.route} id="wrapper" {...bind()}>
          {!loading &&<Component {...pageProps} key={router.route} />}
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