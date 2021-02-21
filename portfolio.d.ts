import { Spring, Tween } from 'framer-motion';
import { Mesh, Texture, Vector3 } from 'three';

declare namespace portfolio {

  interface State {
    projects: Project[]
    selectedProject: Project
    scrollBarProgress: number
    movingScrollBar: boolean
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
    title: readonly string
    id: readonly string
    point: readonly Vector3
    description: readonly string
    assets: readonly Asset[]
    planeRef?: Mesh
    textures: Texture[]
  }

  interface Asset {
    url: readonly string
    w: readonly number
    q: readonly number
  }
  
}

declare module 'portfolio' {
  export = portfolio;
}