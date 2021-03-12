import { State } from 'portfolio';
import { useMemo } from 'react';
import { createStore, Store } from 'redux'
import { projects } from 'src/projects';
import reducer from './reducer';

let store;

const initialState: State = {
  projects,
  selectedProject: projects[0],
  nextProject: null,
  scrollBarProgress: 0,
  movingScrollBar: false
}

const makeStore = (preloadedState: State) => createStore(
  reducer,
  preloadedState
);

export const initializeStore = (preloadedState: State) => {
  let _store = store ?? makeStore(preloadedState);

  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined;
  };

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
}

export function useStore(): Store {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};