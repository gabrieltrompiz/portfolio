import { IUniform as Uniform, Texture } from 'three'

const TIME: Uniform = { value: 0 };

export const getUniforms = (textures: Texture[]) => ({
  uTime: TIME,
  uTexture: { value: textures[0] }
});