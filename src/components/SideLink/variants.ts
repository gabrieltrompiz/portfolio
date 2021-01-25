import { Variants } from 'framer-motion';

const variants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2
    }
  }
}

export default variants;