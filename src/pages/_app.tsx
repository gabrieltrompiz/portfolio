import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { State } from 'portfolio';
import { animate, AnimationPlaybackControls, motion } from 'framer-motion';
import { useGesture } from 'react-use-gesture';
import { handleScroll } from '@utils/events';
import { useStore } from '@redux/store';
import { LoadingManager, TextureLoader } from 'three';
import {  Provider, useDispatch, useSelector } from 'react-redux';
import { addTexture, resetSelectedProject } from '@redux/actions/projects';
import { isMobile } from 'react-device-detect';

import Head from 'next/head';
import LoadingScreen from '@components/LoadingScreen';
import AboutOverlay from '@components/AboutOverlay';
import MobileSplash from '@components/MobileSplash';

import '@styles/main.scss';

const CanvasWebGL = dynamic(() => import('@components/CanvasWebGL'), { ssr: false });

const AppComponent: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const [loading, setLoading] = useState(true);
  const [renderWebGL, setRenderWebGL] = useState(false);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const projects = useSelector((state: State) => state.projects);
  const movingSB = useSelector((state: State) => state.movingScrollBar);
  const selectedProject = useSelector((state: State) => state.selectedProject);
  
  const animation = useRef<AnimationPlaybackControls>(null);

  const onWheel = useCallback((e) => {
    if(!movingSB && !loading && !isMobile) {
      handleScroll(e, router, dispatch);
    }
  }, [movingSB, loading]);

  const bind = useGesture({
    onWheel: onWheel,
    onDrag: onWheel
  });

  const setUpManagers = (loader) => {
    loader.onProgress = (asset, current, total) => {
      const nextProgress = Math.round(current / total * 100);
      animation.current?.stop();
      animation.current = animate(progress, nextProgress, {
        onUpdate: (prog) => setProgress((progress) => Math.max(Math.round(prog), progress)),
        duration: 0.5
      })
    };
    loader.onLoad = () => {
      setRenderWebGL(true);
      // Wait half a second after loading to allow the webgl canvas to render
      setTimeout(() => setLoading(false), 500);
    };
  };

  const startLoading = async (textureLoader) => {
    projects.forEach(project => {
      project.assets.forEach(async (asset) => {
        const params = new URLSearchParams();
        params.set('url', asset.url);
        params.set('w', asset.w.toString());
        params.set('q', asset.q.toString());
        const texture = await textureLoader.load(`/_next/image?${params}`);
        dispatch(addTexture(texture, project.id));
      })
    })
  };

  useEffect(() => {
    if(!isMobile) {
      const loader = new LoadingManager();
      const textureLoader = new TextureLoader(loader);
  
      setUpManagers(loader);
      startLoading(textureLoader);
    } else {
      setLoading(false);
      setRenderWebGL(true);
    }
  }, []);
  
  useEffect(() => {
    if(isMobile && router.pathname === '/projects') {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const onRouteChange = (url) => {
      if(url !== '/projects') {
        setTimeout(() => dispatch(resetSelectedProject()), 1000);
      }
    }

    router.events.on('routeChangeStart', onRouteChange);

    return () => router.events.off('routeChangeStart', onRouteChange);
  }, [router]);

  return (
    <>
      <Head>
        <title>Gabriel Trompiz - Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {renderWebGL && <CanvasWebGL wireframe={router.route !== '/'} router={router} loading={!renderWebGL} />}
      {(!loading && !isMobile) && <AboutOverlay color={selectedProject.titleColor} router={router} />}
      <motion.div key={router.route} custom={router.route} id="wrapper" {...bind()}>
        {loading ? 
          <LoadingScreen progress={progress} /> : 
          <MobileWrapper isMobile={isMobile}>
            <Component {...pageProps} key={router.route} />
          </MobileWrapper>}
      </motion.div>
    </>
  )
};

const MobileWrapper = ({ isMobile, children }) => 
  isMobile ? <MobileSplash /> : children;

const StoreWrapper: React.FC<AppProps> = (props) => {
  const store = useStore();

  return (
    <Provider store={store}>
      <AppComponent {...props} />
    </Provider>
  );
};

export default StoreWrapper;