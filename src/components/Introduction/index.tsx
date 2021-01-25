import React from 'react';
import { motion } from 'framer-motion';
import variants from './variants';
import ArrowDown from '@components/ArrowDown';

const Introduction: React.FC = () => {
  return (
    <div id='introduction'>
      <motion.p 
        id='name'
        initial='hidden'
        animate='visible'
        variants={variants.title}
      >
        Gabriel Trompiz
      </motion.p>
      <motion.p 
        id='role'
        initial='hidden'
        animate='visible'
        variants={variants.role}
      >
        Full-Stack Developer / Software Engineer
      </motion.p>
      <ArrowDown />
    </div>
  )
};

export default Introduction;