import { SetMovingSBAction, SetProgressAction } from './types';

export const setProgress = (progress: number): SetProgressAction => ({ type: 'SET_PROGRESS', payload: progress });

export const setMovingScollBar = (moving: boolean): SetMovingSBAction => ({ type: 'SET_MOVING_SCROLL_BAR', payload: moving });