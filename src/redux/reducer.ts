import { State } from 'portfolio';
import { AnyAction } from './actions/types';
import { projects } from 'src/projects';

const initialState: State = {
  projects: [],
  selectedProject: null,
  scrollBarProgress: 0,
  movingScrollBar: false,
  nextProject: null
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
        scrollBarProgress: scrollBarProgress || state.scrollBarProgress
      };
    };

    case 'SET_MOVING_SCROLL_BAR': {
      const movingScrollBar = action.payload;

      return {
        ...state,
        movingScrollBar
      };
    };

    case 'GO_TO_PROJECT': {
      const direction = action.payload;
      const currentIndex = state.projects.findIndex(p => p.id === state.selectedProject.id);
      const nextIndex = direction === 'NEXT' ? (currentIndex === state.projects.length - 1 ? currentIndex : currentIndex + 1) 
        : (currentIndex <= 0 ? currentIndex : currentIndex - 1);
      const nextProject = state.projects[nextIndex];
      
      return {
        ...state,
        nextProject
      };
    };

    case 'RESET_SELECTED_PROJECT': {
      return {
        ...state,
        selectedProject: projects[0],
        scrollBarProgress: 0,
        nextProject: null
      }
    }

    default: return state;
  }
};

export default reducer;