import { States } from 'portfolio';
import { OPEN_PROJECTS, CLOSE_PROJECTS } from '../actions/actions';

export const initialState: States.SlideShow = {
  slideshow: undefined
}

const reducer = (state: States.SlideShow = initialState, action): States.SlideShow => {
  switch(action.type) {
    case OPEN_PROJECTS: {
      return {
        slideshow: 'ELECTRA'
      }
    }
    case CLOSE_PROJECTS: {
      return {
        slideshow: undefined
      }
    }
    default: return state;
  }
}

export default reducer;