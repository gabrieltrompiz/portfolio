import { AppProps } from 'next/app';
import '@styles/main.scss';
import Background from '@components/Background';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import SideLink from '@components/SideLink';
import Head from 'next/head';

const variants: Variants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1, 
    transition: { 
      duration: 1, 
    } 
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.5, 
    }
  }
}

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const isAbout = router.route === '/about';

  return (
    <>
      <Head>
        <title>Gabriel Trompiz - Developer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Background wireframe={router.route !== '/'} />
      <AnimatePresence>
        <motion.div key={`overlay-${router.route}`} id='overlay' exit='exit' initial='initial' animate='enter' variants={variants}>
          <SideLink href='mailto:hello@gabrieltrompiz.com?subject=Hello Gabriel'>
            hello@gabrieltrompiz.com
          </SideLink>
          <SideLink onClick={() => router.push(isAbout ? '/' : '/about')}>
            {isAbout ? 'Home' : 'About me'}
          </SideLink>
        </motion.div>
        <motion.div key={router.route} id='wrapper' exit='exit' initial='initial' animate='enter' variants={variants}>
          <Component {...pageProps} key={router.route}/>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default App;
