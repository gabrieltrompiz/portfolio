import React from 'react';
import { State } from 'portfolio';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { projectTitle } from '@utils/variants';
import ProjectSlider from '@components/ProjectSlider';

const Projects: React.FC = () => {
  const selectedProject = useSelector((state: State) => state.selectedProject);

  return (
    <div className='flex-full'>
      <div id='projects'>
        <motion.p variants={projectTitle} key={selectedProject.title} exit='exit' initial='initial' animate='enter' id='projectTitle'>
          {selectedProject?.title}
        </motion.p>
        <ProjectSlider />
      </div>
    </div>
  );
};

export default Projects;