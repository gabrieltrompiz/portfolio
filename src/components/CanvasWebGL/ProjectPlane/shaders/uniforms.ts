import { IUniform as Uniform, Texture } from 'three'

const TIME: Uniform = { value: 0 };

export const getUniforms = (texture?: Texture) => ({
  uTime: TIME,
  // uTexture: { value: texture }
});