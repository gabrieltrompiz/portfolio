import { State } from 'portfolio';
import { AnyAction } from './actions/types';

const initialState: State = {
  projects: [],
  selectedProject: null
};

const reducer = (state = initialState, action: AnyAction): State => {
  switch(action.type) {
    case 'ADD_TEXTURE': {
      const { texture, id } = action.payload;
      const pIndex = state.projects.findIndex(t => t.id === id);
      const _projects = [...state.projects];
      const _textures = _projects[pIndex].textures;
      _projects[pIndex].textures = [..._textures, texture];

      return {
        ...state,
        projects: _projects
      };
    };
    
    case 'SET_PLANE_REF': {
      const { ref, id } = action.payload;
      const pIndex = state.projects.findIndex(t => t.id === id);
      const _projects = [...state.projects];
      _projects[pIndex].planeRef = ref;
      
      return {
        ...state,
        projects: _projects
      };
    };

    case 'SET_SELECTED_PROJECT': {
      const selectedProject = action.payload;

      return {
        ...state,
        selectedProject
      };
    };

    default: return state;
  }
};

export default reducer;