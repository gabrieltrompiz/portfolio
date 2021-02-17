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
      delay: 0.5
    } 
  },
  exit: route => ({
    opacity: 0,
    y: route === '/projects' ? 100 : -100,
    transition: { 
      ease: 'easeInOut',
      duration: 0.5, 
    }
  }),
  goToProjects: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1
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

export const projectTitle = sideLinkContainer;

export const slider: { [title: string]: Variants } = {
  separator: {
    initial: {
      top: 10,
      left: 18,
      marginBottom: 0,
      marginTop: 0,
      height: 40,
      rotate: 45
    },
    hover: {
      height: 18,
      marginTop: 2,
      marginBottom: 2,
      top: 20,
      left: 20,
      rotate: 90
    }
  },
  firstSlide: {
    initial: {
      top: 0,
      left: 0
    },
    hover: {
      top: 17,
      left: -10
    }
  },
  secondSlide: {
    initial: {
      top: 30,
      left: 30
    },
    hover: {
      top: 17,
      left: 45
    }
  },
  chevron: {
    initial: (first) => ({
      top: !first ? 10 : 52,
      left: !first ? 11 : 32,
      opacity: 0,
      rotate: first ? 90 : -90
    }),
    hover: {
      opacity: 1,
    }
  },
  thumbnail: {
    initial: {
      scale: 1
    },
    hold: {
      scale: 0.75
    }
  }
};