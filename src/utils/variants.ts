import { Variants } from 'framer-motion';

export const introduction: { [name: string]: Variants } = {
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
        delay: 0.5,
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
        delay: 1
      }
    }
  }
};

export const sideLink: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1
    }
  }
}

export const pages: Variants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1, 
    transition: { 
      duration: 1, 
    } 
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.5, 
    }
  },
  goToProjects: {
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
  }
}

export const sideLinkContainer: Variants = {
  initial: { 
    opacity: 0, 
    transition: {
      duration: 0.5
    } 
  },
  enter: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
    } 
  },
  exit: {
    opacity: 0,
    transition: { 
      duration: 0.5, 
    }
  }
}