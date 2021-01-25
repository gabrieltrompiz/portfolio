import { AppProps } from 'next/app';
import '@styles/main.scss';
import Background from '@components/Background';
import { AnimatePresence, AnimateSharedLayout, motion, Variants } from 'framer-motion';

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
  return (
    <>
      <Background />
      <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter>
          <motion.div key={router.route} id='wrapper' exit='exit' initial='initial' animate='enter' variants={variants}>
            <Component {...pageProps} key={router.route}/>
          </motion.div>
        </AnimatePresence>
      </AnimateSharedLayout>
    </>
  )
}

export default App;
