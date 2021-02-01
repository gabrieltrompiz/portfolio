import React from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { sideLink as variants } from '@utils/variants';

const SideLink: React.FC<HTMLMotionProps<'a'>> = ({ children, ...props }) => {
  return (
    <div className='link'>
      <motion.a {...props} initial='hidden' animate='visible' variants={variants}>
        {children}
      </motion.a>
    </div>
  )
};

export default SideLink;