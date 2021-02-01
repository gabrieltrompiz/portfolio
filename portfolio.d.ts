import { Spring, Tween } from 'framer-motion';

declare namespace portfolio {

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
  
}

declare module 'portfolio' {
  export = portfolio;
}