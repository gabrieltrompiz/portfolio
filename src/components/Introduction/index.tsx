import React from 'react';
import { motion } from 'framer-motion';
import variants from './variants';
import { RiArrowDownSLine } from 'react-icons/ri';

const Introduction: React.FC = () => {
  return (
    <div id='introduction'>
      <div>
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
          Full-Stack Developer
        </motion.p>
      </div>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={variants.role}
        id='scroll'
      >
        <p>Scroll</p>
        <RiArrowDownSLine color='rgba(255, 255, 255, 0.5)' size={30} id='arrow-down' />
      </motion.div>
    </div>
  )
};

export default Introduction;