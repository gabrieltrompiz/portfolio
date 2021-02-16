import { State } from 'portfolio';
import { ADD_TEXTURE, TextureAction } from './actions/types';

const initialState: State = {
  textures: []
};

const reducer = (state = initialState, action: TextureAction) => {
  switch(action.type) {
    case ADD_TEXTURE: {
      const texture = action.payload;
      return {
        ...state,
        textures: [...state.textures, texture]
      };
    }
    default: return state;
  }
};

export default reducer;