import { goToNextProject } from '@redux/actions/projects';
import { Router } from 'next/router';
import { Handler } from 'react-use-gesture/dist/types';

let isTransitioning = false;
const TRANSITION_TIME = 2000;

// Returns the direction of the swipe/scroll
const getDirection = (y: number): Directions => {
  const { DOWN, UP, STATIC } = Directions;
  return y >= 0.75 ? UP : y <= - 0.75 ? DOWN : STATIC;
};

// Returns the URL that the user is trying to navigate to
// In case it's in the /projects page it will return the next project
const getNextLocation = (direction: Directions, current: string): NextLocation => {
  switch(getDirection(direction)) {
    case Directions.DOWN: {
      if(current === '/projects') {
        return { url: '/projects', willDispatch: 'NEXT' }
      }
      return { url: '/projects' };
    };
    case Directions.UP: {
      if(current === '/projects') {
        return { url: '/projects', willDispatch: 'PREV' };
      }
      return { url: current };
    }
    default:
      return { url: current };
  }
};

// Handles the swipe/scroll events, it has a threshold so it's not too sensitive
export const handleScroll: ScrollHandler = (e, router, dispatch) => {
  const isScrolling = e.event.type === 'wheel';
  const threshold = isScrolling ? 2 : 0.5;
  const direction = !isScrolling ? e.direction[1] : - e.direction[1];
  const { url, willDispatch } = getNextLocation(direction, router.route);
  const isGoingElsewhere = router.route !== url || willDispatch;
  if(e.velocity >= threshold && !isTransitioning && isGoingElsewhere) {
    isTransitioning = true;
    setTimeout(() => isTransitioning = false, TRANSITION_TIME);
    if(!willDispatch) {
      router.push(url);
    } else {
      dispatch(goToNextProject(willDispatch));
    }
  }
};

type EventHandler = Handler<'wheel' | 'drag'>;
type ScrollHandler = EventHandler extends (...a: infer U) => infer R ? (...a: [...U, Router, Function]) => R : never;

enum Directions {
  'DOWN',
  'UP',
  'STATIC'
};

interface NextLocation {
  url: string
  willDispatch?: 'NEXT' | 'PREV'
}