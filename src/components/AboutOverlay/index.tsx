import React from 'react';
import { NextRouter } from 'next/router';
import { BsArrowDownShort } from 'react-icons/bs';
import { motion } from 'framer-motion';

const AboutOverlay: React.FC<AboutOverlayProps> = ({ color, router }) => {
  const isAbout = router?.route === '/about';

  return (
    <motion.div id="overlay" style={{ color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div id="page-top">
        <p>GABRIEL</p>
        <p>
          <a onClick={() => router.push(isAbout ? '/projects' : '/about')}>
            ABOUT
          </a>
        </p>
      </div>
      <div id="page-bottom">
        <div id='rss'>
          <p>
            <a href="mailto:hello@gabrieltrompiz.com?subject=Hello%20Gabriel">
              EMAIL
            </a>
            <BsArrowDownShort size={18} className="external-link" />
          </p>
          <p>
            <a href="https://github.com/gabrieltrompiz" target="_blank" rel="noreferrer">GITHUB</a>
            <BsArrowDownShort size={18} className="external-link" />
          </p>
          <p>
            <a href="https://linkedin.com/in/gabrieltrompiz" target="_blank" rel="noreferrer">LINKEDIN</a>
            <BsArrowDownShort size={18} className="external-link" />
          </p>
        </div>
        <p>
          FULLSTACK DEVELOPER <br />
          AUSTIN, TX
        </p>
      </div>
    </motion.div>
  );
};

export default AboutOverlay;

interface AboutOverlayProps {
  color: string;
  router: NextRouter;
}