import { States } from 'portfolio';

export const initialState: States.Projects = {
  projects: []
};

const reducer = (state: States.Projects = initialState, action): States.Projects => {
  switch(action.type) {
    default: return state;
  }
}

export default reducer;