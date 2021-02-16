import { Project } from 'portfolio';
import { Mesh, Texture } from 'three';
import { SetPlaneRefAction, AddTextureAction, SetSelectedProjectAction } from './types';

export const setPlaneRef = (ref: Mesh, id: string): SetPlaneRefAction => ({ type: 'SET_PLANE_REF', payload: { id, ref } });

export const addTexture = (texture: Texture, id: string): AddTextureAction => ({ type: 'ADD_TEXTURE', payload: { id, texture } });

export const setSelectedProject = (project: Project): SetSelectedProjectAction => ({ type: 'SET_SELECTED_PROJECT', payload: project });