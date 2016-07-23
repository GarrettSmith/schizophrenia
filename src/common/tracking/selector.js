import {createSelector} from 'reselect';
import {
  evolve,
  filter,
  map,
  pick,
  pipe,
  prop,
  values,
} from 'ramda';
import moment from 'moment';

const entriesSelector = state => values(state.logging.entries);
const dimensionsSelector = state => values(state.tracking.dimensions);

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

const enabledDimensions = filter(prop('enabled'));

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
    dimensionsSelector,
  ],
  (
    entries,
    dimensions,
  ) => ({
    data: overviewData(entries),
    dimensions: dimensions,
    enabledDimensions: enabledDimensions(dimensions),
    domain: DOMAIN,
  })
);
