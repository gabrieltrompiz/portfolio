import { Spring, Tween } from 'framer-motion';
import { Mesh, Texture } from 'three';

declare namespace portfolio {

  interface State {
    projects: Project[]
    selectedProject: Project
    scrollBarProgress: number
    movingScrollBar: boolean
    nextProject: Project
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
    description: readonly string
    backgroundColor: readonly string
    titleColor: readonly string
    assets: readonly Asset[]
    planeRef?: Mesh
    textures: Texture[]
  }

  interface Asset {
    url: readonly string
    w: readonly number
    q: readonly number
  }

  export const enum ProjectDirection {
    'NEXT' = 'NEXT',
    'PREV' = 'PREV'
  }
  
}

declare module 'portfolio' {
  export = portfolio;
}