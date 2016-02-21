import {
  compose,
  curry,
  filter,
  path as _path,
  pipe,
  reverse,
  unfold,
} from 'ramda';

const traverse = curry((traverser, route) => {
  const next = traverser(route);
  return next ? traverse(traverser, next) : route;
});

export const parent = _path(['parent', 'parentRoute']);
export const currentChild = _path(['childRouter', 'currentRoute']);

// Find the deepest current route
export const current = traverse(currentChild);

// Find the top active route
export const base = traverse(parent);

export const path = pipe(
  unfold(r => r ? [r, parent(r)] : false),
  // drop wrapped router pathes
  filter(r => r.name[0] !== '_'),
  reverse
);


