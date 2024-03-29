import React, { useEffect } from 'react';

import { State } from 'portfolio';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { projectTitle } from '@utils/variants';
import { useRouter } from 'next/router';
import { introduction as variants } from '@utils/variants';

import ProjectSlider from '@components/ProjectSlider';
import ProjectDescriptions from '@components/ProjectDescriptions';
import { RiArrowUpSLine } from 'react-icons/ri';

const Projects: React.FC = () => {
  const selectedProject = useSelector((state: State) => state.selectedProject);
  const movingSB = useSelector((state: State) => state.movingScrollBar);

  const router = useRouter();

  const controls = useAnimation();

  useEffect(() => {
    controls.start('enter');
  }, [controls]);

  useEffect(() => {
    if(movingSB) {
      controls.start('exit');
    } else {
      controls.start('enter');
    }
  }, [movingSB, controls]);

  useEffect(() => {
    controls.start('enter');
  }, [selectedProject, controls]);

  return (
    <>
      <Head>
        <title>Gabriel Trompiz - Projects</title>
      </Head>
      <div className='flex-full flex-column'>
        <motion.div
          initial='hidden'
          animate='visible'
          variants={variants.role}
          id='scroll'
          onClick={() => router.push('/')}
        >
          <RiArrowUpSLine color={selectedProject.titleColor} size={30} id='arrow-up' />
          <p>
            <Link href="/">
              <a style={{ color: selectedProject.titleColor }}>Go to home</a>
            </Link>
          </p>
        </motion.div>
        <ProjectSlider /> 
        <div id='projects'>
          <motion.p variants={projectTitle} key={selectedProject.title} exit='exit' initial='initial' animate={controls} id='project-title' style={{ color: selectedProject.titleColor }}>
            {selectedProject?.title}
          </motion.p>
        </div>
        <ProjectDescriptions {...selectedProject} router={router} />
      </div>
    </>
  );
};

export default Projects;