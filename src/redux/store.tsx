import { State } from 'portfolio';
import { useMemo } from 'react';
import { combineReducers, createStore } from 'redux'
import projects, { initialState as projectIS } from './reducers/projects';
import slideshow, { initialState as slideshowIS } from './reducers/slideshow';

let store;

const makeStore = (preloadedState: State) => createStore(
  combineReducers({
    ps: projects,
    ss: slideshow
  }),
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

export function useStore() {
  const initialState: State = ({ ps: projectIS, ss: slideshowIS });
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};