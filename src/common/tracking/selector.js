import {createSelector} from 'reselect';
import {
  evolve,
  map,
  pick,
  pipe,
  values,
} from 'ramda';
import moment from 'moment';

const entriesSelector = state => values(state.logging.entries);

const overviewFilter = map(pick([
  'createdAt',
  'physical',
  'mental',
  'emotional',
]));

const normalizeDates = map(evolve({
  createdAt: x => moment(x).startOf('day'),
}));

const overviewData = pipe(overviewFilter, normalizeDates);

const DIMENSIONS = [
  {
    name: 'Physical',
    key: 'physical',
  },
  {
    name: 'Mental',
    key: 'mental',
  },
  {
    name: 'Emotional',
    key: 'emotional',
  },
];

const DOMAIN = {
  x: [
    moment().startOf('week').toDate(),
    moment().endOf('week').toDate(),
  ],
  y: [1, 5],
};

export default createSelector(
  [
    entriesSelector,
  ],
  (entries) => ({
    data: overviewData(entries),
    dimensions: DIMENSIONS,
    domain: DOMAIN,
  })
);
