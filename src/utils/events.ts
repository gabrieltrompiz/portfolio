import { Router } from 'next/router';
import { Handler } from 'react-use-gesture/dist/types';

let isTransitioning = false;
const TRANSITION_TIME = 2000;

const getDirection = (y: number): Directions => {
  const { DOWN, UP, STATIC } = Directions;
  return y >= 0.75 ? UP : y <= - 0.75 ? DOWN : STATIC;
};

const getNextLocation = (direction: Directions, current: string): string => {
  switch(getDirection(direction)) {
    case Directions.DOWN:
      return '/projects';
    default:
      return current;
  }
};

export const handleScroll: ScrollHandler = (e, router) => {
  const isScrolling = e.event.type === 'wheel';
  const threshold = isScrolling ? 2 : 0.5;
  const direction = !isScrolling ? e.direction[1] : - e.direction[1];
  const nextRoute = getNextLocation(direction, router.route);
  const isGoingElsewhere = router.route !== nextRoute;
  if(e.velocity >= threshold && !isTransitioning && isGoingElsewhere) {
    isTransitioning = true;
    router.push(nextRoute);
    setTimeout(() => isTransitioning = false, TRANSITION_TIME);
  }
};

type EventHandler = Handler<'wheel' | 'drag'>;
type ScrollHandler = EventHandler extends (...a: infer U) => infer R ? (...a: [...U, Router]) => R : never;

enum Directions {
  'DOWN',
  'UP',
  'STATIC'
};