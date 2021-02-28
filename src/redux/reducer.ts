import { State } from 'portfolio';
import { AnyAction } from './actions/types';

const initialState: State = {
  projects: [],
  selectedProject: null,
  scrollBarProgress: 0,
  movingScrollBar: false
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
      const id = action.payload;
      const selectedProject = state.projects.find(p => p.id === id);

      return {
        ...state,
        selectedProject
      };
    };

    case 'SET_PROGRESS': {
      const scrollBarProgress = action.payload;

      return {
        ...state,
        scrollBarProgress
      };
    };

    case 'SET_MOVING_SCROLL_BAR': {
      const movingScrollBar = action.payload;

      return {
        ...state,
        movingScrollBar
      };
    };

    default: return state;
  }
};

export default reducer;