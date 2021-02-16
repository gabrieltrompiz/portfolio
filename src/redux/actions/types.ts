import { Texture } from 'three';

export const ADD_TEXTURE = 'ADD_TEXTURE';

export interface AddTextureAction {
  type: typeof ADD_TEXTURE
  payload: Texture
}

export type TextureAction = AddTextureAction;