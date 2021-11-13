import React from 'react';

import { motion } from 'framer-motion';
import { about as variants } from '@utils/variants';

const About: React.FC = () => {
  return (
    <motion.div id="about" variants={variants} initial="initial" animate="visible" exit="initial">
      <p>
        Born and raised in Venezuela. <br />
        I&apos;m a full-stack developer based in Austin, TX. <br />
        Focused on creating clean, maintainable code. <br />
        <br />
        Currently working at <a href="https://www.reign.cl/" target="_blank" rel="noreferrer">Reign</a> as a front-end <br />
        developer. Ocasionally contributing to <br />
        open source projects and trying to finish  <br />
        side projects.
      </p>
      {/* <div id="social-media">
        <a>LINKEDIN</a>
        <a>GITHUB</a>
        <a>EMAIL</a>
      </div> */}
    </motion.div>
  );
};

export default About;