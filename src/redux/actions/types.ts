import { Mesh, Texture } from 'three';

export const ADD_TEXTURE = 'ADD_TEXTURE';
export const SET_PLANE_REF = 'SET_PLANE_REF';
export const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECT';
export const SET_PROGRESS = 'SET_PROGRESS';
export const SET_MOVING_SCROLL_BAR = 'SET_MOVING_SCROLL_BAR';
export const GO_TO_PROJECT = 'GO_TO_PROJECT';
export const RESET_SELECTED_PROJECT = 'RESET_SELECTED_PROJECT';

export interface AddTextureAction {
  type: typeof ADD_TEXTURE
  payload: {
    texture: Texture
    id: string
  }
}

export interface SetPlaneRefAction {
  type: typeof SET_PLANE_REF
  payload: { 
    ref: Mesh
    id: string
  }
}

export interface SetSelectedProjectAction {
  type: typeof SET_SELECTED_PROJECT,
  payload: string
}

export interface GoToProjectAction {
  type: typeof GO_TO_PROJECT
  payload: 'NEXT' | 'PREV' 
}
export interface SetProgressAction {
  type: typeof SET_PROGRESS
  payload: number
}

export interface SetMovingSBAction {
  type: typeof SET_MOVING_SCROLL_BAR
  payload: boolean
}

export interface ResetSelectedProject {
  type: typeof RESET_SELECTED_PROJECT
}

export type AnyAction = AddTextureAction | SetPlaneRefAction | SetSelectedProjectAction | SetProgressAction | SetMovingSBAction | GoToProjectAction | ResetSelectedProject;