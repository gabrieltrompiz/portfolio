import { Texture } from 'three';
import { AddTextureAction, ADD_TEXTURE } from './types';

export const addTexture = (texture: Texture): AddTextureAction => ({ type: ADD_TEXTURE, payload: texture });