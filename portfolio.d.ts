import { Spring, Tween } from 'framer-motion';
import { Texture } from 'three';

declare namespace portfolio {

  interface State {
    textures: Texture[]
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