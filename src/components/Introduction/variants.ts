import { Variants } from 'framer-motion';

const variants: { [name: string]: Variants } = {
  title: {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.5
      }
    }
  },
  role: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 2
      }
    }
  }
};

export default variants;