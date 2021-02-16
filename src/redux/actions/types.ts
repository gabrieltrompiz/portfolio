import { Project } from 'portfolio';
import { Mesh, Texture } from 'three';

export const ADD_TEXTURE = 'ADD_TEXTURE';
export const SET_PLANE_REF = 'SET_PLANE_REF';
export const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECT';

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
  payload: Project
}

export type AnyAction = AddTextureAction | SetPlaneRefAction | SetSelectedProjectAction;