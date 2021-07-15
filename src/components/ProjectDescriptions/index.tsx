import { Project, State } from 'portfolio';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { sideLinkContainer as variants } from '@utils/variants';

const ProjectDescriptions: React.FC<Project> = ({ completedDate, type, role, description, titleColor }) => {
  const moving = useSelector((state: State) => state.movingScrollBar);

  const controls = useAnimation();

  useEffect(() => {
    if(moving) {
      controls.start('exit');
    } else {
      controls.start('enter')
    }
  }, [moving]);

  return (
    <motion.div id="project-descriptions" exit="exit" variants={variants} animate={controls} style={{ color: titleColor }}>
      <div id="additional-data">
        <div>
          <p>Completed</p>
          <p>Type</p>
          <p>Role</p>
        </div>
        <div>
          <p>{completedDate}</p>
          <p>{type}</p>
          <p>{role.toString()}</p>
        </div>
      </div>
      <div id="explore">

      </div>
      <div id="description">
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectDescriptions;