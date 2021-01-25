import React from 'react';
import { motion, Variants } from 'framer-motion';

const title: Variants = {
  hidden: { 
    opacity: 0,
    y: -10
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 0.5, duration: 0.5 } 
  }
};

const role: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 1 }
  }
}

const Introduction: React.FC = () => {
  return (
    <>
      <motion.p 
        id='name'
        initial='hidden'
        animate='visible'
        variants={title}
      >
        Gabriel Trompiz
      </motion.p>
      <motion.p 
        id='role'
        initial='hidden'
        animate='visible'
        variants={role}
      >
        Full-Stack Developer / Software Engineer
      </motion.p>
    </>
  )
};

export default Introduction;