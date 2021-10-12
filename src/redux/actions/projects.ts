import { Mesh, Texture } from 'three';
import { SetPlaneRefAction, AddTextureAction, SetSelectedProjectAction, GoToProjectAction, ResetSelectedProject } from './types';

export const setPlaneRef = (ref: Mesh, id: string): SetPlaneRefAction => ({ type: 'SET_PLANE_REF', payload: { id, ref } });

export const addTexture = (texture: Texture, id: string): AddTextureAction => ({ type: 'ADD_TEXTURE', payload: { id, texture } });

export const setSelectedProject = (id: string): SetSelectedProjectAction => ({ type: 'SET_SELECTED_PROJECT', payload: id });

export const goToNextProject = (direction: 'NEXT' | 'PREV'): GoToProjectAction => ({ type: 'GO_TO_PROJECT', payload: direction });

export const resetSelectedProject = (): ResetSelectedProject => ({ type: 'RESET_SELECTED_PROJECT' });