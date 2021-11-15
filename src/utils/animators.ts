import { animate } from 'framer-motion';
import { AnimationOptions, StateHandler } from 'portfolio';

const defaultOptions: AnimationOptions<any> = {
  ease: 'easeInOut',
  duration: 2
};

// Animates multiple properties at once
export const animateMultiple = <T>(from: T, to: T, handler: StateHandler<T>, options: AnimationOptions<any> = {}): void => {
  for(const k of Object.keys(from)) {
    animate(from[k], to[k], {
      ...defaultOptions,
      onUpdate: (v) => handler((state) => ({ ...state, [k]: v })),
      ...options
    });
  }
};