import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';
import { State } from 'portfolio';
import { slider as variants } from '@utils/variants';
import Chevron from './Chevron';
import { useGesture } from 'react-use-gesture';

const ProjectSlider: React.FC = () => {
  const projects = useSelector((state: State) => state.projects);
  const selectedProjects = useSelector((state: State) => state.selectedProject);
  const currentIndex = projects.findIndex(p => p.id === selectedProjects.id) + 1;

  const controls = useAnimation();
  
  const onMouseOver = () => {
    controls.start('hover');
  };

  const onMouseOut = () => {
    controls.start('initial');
  };

  const onMouseDown = () => {
    controls.start('hover');
    controls.start('hold');
  }; 

  const onMouseUp = () => {
    controls.start('initial');
  }; 

  const bind = useGesture({
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    onTouchStart: onMouseDown,
    onTouchEnd: onMouseUp
  });

  return (
    <div id='project-slider'>
      <div className='scroll-bar' id='top' />
      <motion.div id='thumbnail' {...bind()} initial='initial' animate={controls} variants={variants.thumbnail}>
        <motion.div id='chevron' initial='initial' animate={controls} variants={variants.chevron} custom={true}>
          <Chevron />
        </motion.div>        
        <motion.p initial='initial' animate={controls} variants={variants.firstSlide}>{currentIndex}</motion.p>
        <motion.div id='separator' initial='initial' animate={controls} variants={variants.separator} />
        <motion.p initial='initial' animate={controls} variants={variants.secondSlide}>6</motion.p>
        <motion.div id='chevron' initial='initial' animate={controls} variants={variants.chevron} custom={false}>
          <Chevron />
        </motion.div>
      </motion.div>
      <div className='scroll-bar' id='bottom' />
    </div>
  );
};

export default ProjectSlider;