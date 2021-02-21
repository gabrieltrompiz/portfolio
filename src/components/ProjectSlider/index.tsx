import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DragHandlers, HTMLMotionProps, motion, useAnimation, useMotionValue } from 'framer-motion';
import { useSelector } from 'react-redux';
import { State } from 'portfolio';
import { slider as variants } from '@utils/variants';
import Chevron from './Chevron';
import { useGesture } from 'react-use-gesture';

const ProjectSlider: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [dragLimit, setDragLimit] = useState<number>(0);

  const projects = useSelector((state: State) => state.projects);
  const selectedProjects = useSelector((state: State) => state.selectedProject);
  const currentIndex = projects.findIndex(p => p.id === selectedProjects.id) + 1;

  const controls = useAnimation();

  const scrollBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(scrollBar.current) setDragLimit(scrollBar.current.clientHeight - 80);
  }, [scrollBar.current]);
  
  const onMouseOver = () => controls.start('hover');
  const onMouseUp = () => controls.start('initial');
  const onMouseOut = () => controls.start('initial');

  const onMouseDown = () => {
    controls.start('hover');
    controls.start('hold');
  }; 

  const onDrag: DragHandlers['onDrag'] = (e) => {
    const slider = (scrollBar.current?.children[2] as HTMLDivElement);
    const prog = slider.style.transform.split(',')[1]?.trim()?.replace('px', '');
    setProgress(+prog || 0)
  };

  const bind = useGesture({
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    onTouchStart: onMouseDown,
    onTouchEnd: onMouseUp
  });

  const dragOptions: HTMLMotionProps<'div'> = {
    drag: 'y',
    dragConstraints: { top: 0, bottom: dragLimit || 0 },
    dragElastic: 0,
    dragMomentum: false,
    onDrag
  };

  return (
    <div id='project-slider' ref={scrollBar}>
      <motion.div className='scroll-bar' id='top' style={{ height: `calc(0% + ${progress}px)` }} />
      <div id='placeholder-slider' />
      <motion.div id='thumbnail' {...dragOptions} {...bind()} initial='initial' animate={controls} variants={variants.thumbnail}>
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
      <motion.div className='scroll-bar' id='bottom' style={{ height: `calc(100% - ${progress}px - 90px)` }} />
    </div>
  );
};

export default ProjectSlider;