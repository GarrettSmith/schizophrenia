import {
  PropDimension,
} from './models';

import shortid from 'shortid';
import {
  map,
  merge,
  toLower,
} from 'ramda';

export const TIME_SCALES = {
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const TIME_INTERVAL_DIRECTIONS = {
  NOW: 'NOW',
  PREVIOUS: 'PREVIOUS',
  NEXT: 'NEXT',
};

const OVERVIEW_PROPS = [
  'Physical',
  'Mental',
  'Emotional',
];

export const OVERVIEW_DIMENSIONS = map(
  prop => merge(
    PropDimension,
    {
      id: shortid(),
      name: prop,
      prop: toLower(prop)
    }
  ),
  OVERVIEW_PROPS
);
