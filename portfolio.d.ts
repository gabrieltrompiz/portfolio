import { Spring, Tween } from 'framer-motion';

declare namespace portfolio {

  interface State {
    ps: States.Projects
    ss: States.SlideShow
  }

  namespace States {
    interface Projects {
      projects: Project[]
    }

    interface SlideShow {
      slideshow?: Project['name']
    }
  }

  type Coordinates = {
    x: number;
    y: number;
    z: number;
  }

  type Handlers<T> = {
    [K in keyof T]: (args: T[K]) => any;
  }

  type StateHandler<T> = (args: (state: T) => T) => void;

  interface PlaybackLifecycles<V> {
    onUpdate?: (latest: V) => void;
    onPlay?: () => void;
    onComplete?: () => void;
    onRepeat?: () => void;
    onStop?: () => void;
  }

  type AnimationOptions<V> = (Tween | Spring) & PlaybackLifecycles<V> & {
    delay?: number;
    type?: "tween" | "spring";
  }

  interface Project {
    name: readonly string
    rawUrls: readonly string[]
    description: string
    optimizedUrls?: string[]
  }
  
}

declare module 'portfolio' {
  export = portfolio;
}