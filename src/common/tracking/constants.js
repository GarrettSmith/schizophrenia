import {
  PropDimension,
} from './models';

import shortid from 'shortid';
import randomColor from 'randomcolor'
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

export const DIMENSION_CATEGORIES = {
  OVERVIEW: 'overview',
  OPTIONAL: 'optional',
  SIDE_EFFECTS: 'side_effects',
  SYMPTOMS: 'symptoms',
};

const OVERVIEW_PROPS = [
  {
    name: 'Physical',
    prop: 'physical',
  },
  {
    name: 'Mental',
    prop: 'mental',
  },
  {
    name: 'Emotional',
    prop: 'emotional',
  },
];

const OPTIONAL_PROPS = [
  {
    name: 'Weight',
    prop: 'weight',
  },
  {
    name: 'Blood Sugar',
    prop: 'bloodSugar',
  },
  {
    name: 'Blood Pressure Systolic',
    prop: 'bloodPressureSystolic',
  },
  {
    name: 'Blood Pressure Diastolic',
    prop: 'bloodPressureDiastolic',
  },
];

const createDimensions = category => map(
  ({name, prop}) => merge(
    PropDimension,
    {
      id: shortid(),
      color: randomColor({
        luminosity: 'bright',
      }),
      category,
      name,
      prop,
    }
  )
);

export const OVERVIEW_DIMENSIONS =
  createDimensions(DIMENSION_CATEGORIES.OVERVIEW)(OVERVIEW_PROPS);
export const OPTIONAL_DIMENSIONS =
  createDimensions(DIMENSION_CATEGORIES.OPTIONAL)(OPTIONAL_PROPS);
