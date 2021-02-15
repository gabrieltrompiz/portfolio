import { Color, IUniform as Uniform, Vector2 } from 'three'

const BIG_WAVES_ELEVATION: Uniform = { value: 0 };
const BIG_WAVES_FREQUENCY: Uniform = { value: new Vector2(0, 0) };
const BIG_WAVES_SPEED: Uniform = { value: 0.06};

const SMALL_WAVES_ELEVATION: Uniform = { value: 0.1 };
const SMALL_WAVES_FREQUENCY: Uniform = { value: 4 }; 
const SMALL_WAVES_SPEED: Uniform = { value: 0.1 };

const DEPTH_COLOR: Uniform = { value: new Color(0xFFFFFF) };
const SURFACE_COLOR: Uniform = { value: new Color(0x000000) };
const COLOR_OFFSET: Uniform = { value: 0.17 };
const COLOR_MULTIPLIER: Uniform = { value: 5 };
const OPACITY: Uniform = { value: 1 };

const TIME: Uniform = { value: 0 };

export const uniforms = {
  uBigWavesElevation: BIG_WAVES_ELEVATION,
  uBigWavesFrequency: BIG_WAVES_FREQUENCY,
  uBigWavesSpeed: BIG_WAVES_SPEED,
  uSmallWavesElevation: SMALL_WAVES_ELEVATION,
  uSmallWavesFrequency: SMALL_WAVES_FREQUENCY,
  uSmallWavesSpeed: SMALL_WAVES_SPEED,
  uDepthColor: DEPTH_COLOR,
  uSurfaceColor: SURFACE_COLOR,
  uColorOffset: COLOR_OFFSET,
  uColorMultiplier: COLOR_MULTIPLIER,
  uOpacity: OPACITY,
  uTime: TIME
};