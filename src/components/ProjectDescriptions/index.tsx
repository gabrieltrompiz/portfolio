import React, { useEffect } from 'react';

import { Project, State } from 'portfolio';
import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { sideLinkContainer as variants } from '@utils/variants';
import { NextRouter } from 'next/router';

const ProjectDescriptions: React.FC<Project & { router: NextRouter }> = ({ completedDate, type, role, description, titleColor, repo }) => {
  const moving = useSelector((state: State) => state.movingScrollBar);

  const controls = useAnimation();

  // Hides the project details when the user moves the scrollbar
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
        <p>{`${completedDate} // ${type} // ${role.toString()}`}</p>
      </div>
      <div id="description">
        <p>{description}</p>
      </div>
      <div id="explore">
        <div onClick={() => window.open(repo, '_blank')}>
          <p id="learn-more">Go to GitHub repo</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDescriptions;