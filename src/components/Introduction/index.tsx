import React from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { introduction as variants } from '@utils/variants';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useRouter } from 'next/router';

const Introduction: React.FC = () => {
  const router = useRouter();

  return (
    <div id='introduction'>
      <div>
        <motion.p 
          id='name'
          initial='hidden'
          animate='visible'
          variants={variants.title}
          onClick={() => router.push('/projects')}
        >
          Gabriel Trompiz
        </motion.p>
        <motion.p 
          id='role'
          initial='hidden'
          animate='visible'
          variants={variants.role}
        >
          Full-Stack Developer
        </motion.p>
      </div>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={variants.role}
        id='scroll'
        onClick={() => router.push('/projects')}
      >
        <p>
          <Link href="/projects">
            <a>See projects</a>
          </Link>
        </p>
        <RiArrowDownSLine color='rgba(255, 255, 255, 0.5)' size={30} id='arrow-down' />
      </motion.div>
    </div>
  )
};

export default Introduction;