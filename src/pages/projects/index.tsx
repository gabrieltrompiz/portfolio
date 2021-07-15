import React, { useEffect } from 'react';
import { State } from 'portfolio';
import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { projectTitle } from '@utils/variants';
import ProjectSlider from '@components/ProjectSlider';
import ProjectDescriptions from '@components/ProjectDescriptions';
import AboutOverlay from '@components/AboutOverlay';
import { useRouter } from 'next/router';

const Projects: React.FC = () => {
  const selectedProject = useSelector((state: State) => state.selectedProject);
  const movingSB = useSelector((state: State) => state.movingScrollBar);

  const router = useRouter();

  const controls = useAnimation();

  useEffect(() => {
    controls.start('enter');
  }, []);

  useEffect(() => {
    if(movingSB) {
      controls.start('exit');
    } else {
      controls.start('enter');
    }
  }, [movingSB]);

  useEffect(() => {
    controls.start('enter');
  }, [selectedProject]);

  return (
    <div className='flex-full flex-column'>
      <AboutOverlay color={selectedProject.titleColor} router={router}  />
      <ProjectSlider /> 
      <div id='projects'>
        <motion.p variants={projectTitle} key={selectedProject.title} exit='exit' initial='initial' animate={controls} id='project-title' style={{ color: selectedProject.titleColor }}>
          {selectedProject?.title}
        </motion.p>
      </div>
      <ProjectDescriptions {...selectedProject} />
    </div>
  );
};

export default Projects;