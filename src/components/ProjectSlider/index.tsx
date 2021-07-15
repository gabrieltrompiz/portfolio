  import React, { useEffect, useRef, useState } from 'react';
  import { animate, DragHandlers, HTMLMotionProps, motion, useAnimation } from 'framer-motion';
  import { useDispatch, useSelector } from 'react-redux';
  import { State } from 'portfolio';
  import { slider as variants } from '@utils/variants';
  import Chevron from './Chevron';
  import { useGesture } from 'react-use-gesture';
  import { setMovingScollBar, setProgress as setProgressSB } from '@redux/actions/scrollBar';
  import { totalProjects } from 'src/projects';
  import { setSelectedProject } from '@redux/actions/projects';

  const ProjectSlider: React.FC = () => {
    const [progress, setProgress] = useState<number>(0);
    const [dragLimit, setDragLimit] = useState<number>(0);
    const [indexProject, setIndexProject] = useState<number>(1);
    const [offset, setOffset] = useState<number>(0);

    const projects = useSelector((state: State) => state.projects);
    const selectedProject = useSelector((state: State) => state.selectedProject);
    const nextProject = useSelector((state: State) => state.nextProject);

    const controls = useAnimation();
    const dispatch = useDispatch();

    const scrollBar = useRef<HTMLDivElement>(null);

    const division = 100 / (totalProjects - 1);
    const checkpoints = projects.map((p, i) => ({ 
      id: p.id, 
      position: division * i
    }));
    const color = selectedProject?.titleColor || '#FFF';

    useEffect(() => {
      if(scrollBar.current) {
        setDragLimit(scrollBar.current.clientWidth - 80);
        const cp = checkpoints.find(c => c.id === selectedProject.id);
        if(cp) onMouseUp(cp);
      }
    }, [scrollBar.current]);

    useEffect(() => {
      controls.start('initial');
    }, [offset]);

    useEffect(() => {
      const id = getNearestProject(progress * 100 / dragLimit).id;
      setIndexProject(projects.findIndex(p => p.id === id) + 1);
    }, [progress]);

    useEffect(() => {
      if(nextProject) {
        const cp = checkpoints.find(c => c.id === nextProject.id);
        if(cp) onMouseUp(cp);
      };
    }, [nextProject]);

    const onMouseOver = () => controls.start('hover');
    const onMouseOut = () => controls.start('initial');

    const onMouseUp = (cp) => {
      controls.start('initial');
      const percentage = progress * 100 / dragLimit;
      const target = cp || getNearestProject(percentage);
      const shouldBeOn = target.position * dragLimit / 100;
      
      setOffset(shouldBeOn + 5);
      animate(percentage, target.position, {
        onUpdate: (v) => {
          const pixels = (v / 100 * dragLimit);
          setProgress(pixels);
          dispatch(setProgressSB(v));
        },
      });
      dispatch(setSelectedProject(target.id));
      dispatch(setMovingScollBar(false));
    };
    
    const onMouseDown = () => {
      controls.start('hover');
      controls.start('hold');
      dispatch(setMovingScollBar(true));
    }; 

    const getNearestProject = (percentage: number) => checkpoints.reduce((a, b) => Math.abs(b.position - percentage) < Math.abs(a.position - percentage) ? b : a);

    const onDrag: DragHandlers['onDrag'] = () => {
      const slider = (scrollBar.current.children[2] as HTMLDivElement);
      const prog = slider?.style?.transform?.split(',')[0]?.trim().replace('translate3d(', '')?.replace('px', '') || 0;
      const perc = +prog * 100 / dragLimit;
      setProgress(+prog);
      dispatch(setProgressSB(perc));
    };

    const bind = useGesture({
      onMouseOver,
      onMouseOut,
      onMouseDown,
      onMouseUp: () => onMouseUp(null),
      onTouchStart: onMouseDown,
      onTouchEnd: () => onMouseUp(null)
    });

    const dragOptions: HTMLMotionProps<'div'> = {
      drag: 'x',
      dragConstraints: { left: 0, right: dragLimit || 0 },
      dragElastic: 0,
      dragMomentum: false,
      onDrag
    };

    return (
      <motion.div id='project-slider' ref={scrollBar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className='scroll-bar' id='top' style={{ width: `calc(0% + ${progress}px)`, backgroundColor: color }} />
        <motion.div id='placeholder-slider' animate={controls} variants={variants.sliderPlaceholder} />
        <motion.div custom={offset} id='thumbnail' {...dragOptions} {...bind()} initial='initial' animate={controls} variants={variants.thumbnail}>
          <motion.div className='chevron' initial='initial' animate={controls} variants={variants.chevron} custom={true}>
            <Chevron fill={color} />
          </motion.div>        
          <motion.p initial='initial' animate={controls} variants={variants.firstSlide} style={{ color }}>
            {indexProject}
          </motion.p>
          <motion.div id='separator' initial='initial' animate={controls} variants={variants.separator} style={{ backgroundColor: color }} />
          <motion.p initial='initial' animate={controls} variants={variants.secondSlide} style={{ color }}>
            {totalProjects}
          </motion.p>
          <motion.div className='chevron' initial='initial' animate={controls} variants={variants.chevron} custom={false}>
            <Chevron fill={color} />
          </motion.div>
        </motion.div>
        <motion.div className='scroll-bar' id='bottom' style={{ width: `calc(100% - ${progress}px - 90px)`, backgroundColor: color }} />
      </motion.div>
    );
  };

  export default ProjectSlider;