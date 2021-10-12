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
  },
  name: {
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
  })
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
      rotate: 45,
    },
    hover: {
      height: 16,
      marginTop: 2,
      marginBottom: 2,
      top: 21,
      left: 22,
      rotate: 0,
    }
  },
  firstSlide: {
    initial: {
      top: 0,
      left: 0
    },
    hover: {
      top: 20,
      left: 0
    }
  },
  secondSlide: {
    initial: {
      top: 30,
      left: 28
    },
    hover: {
      top: 20,
      left: 35
    }
  },
  chevron: {
    initial: (first) => ({
      top: !first ? 22.5 : 18.5,
      left: !first ? 50 : -22,
      opacity: 0,
      rotate: first ? 180 : 0
    }),
    hover: {
      opacity: 1,
    }
  },
  thumbnail: {
    initial: (x) => ({
      scale: 1,
      x
    }),
    hover: {
      left: 20
    },
    hold: () => ({
      scale: 0.75,
    })
  },
  sliderPlaceholder: {
    initial: {
      width: 80,
    },
    hover: {
      width: 90
    }
  }
};