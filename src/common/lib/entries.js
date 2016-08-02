import moment from 'moment';
import {
  contains,
  filter,
  maxBy,
  pick,
  prop,
  reduce,
  values,
} from 'ramda';

const OVERVIEW_PROPS = [
  'emotional',
  'mental',
  'physical',
];

export function createdOnDay(date, entries) {
  const day = moment(date);
  return filter(
    entry => moment(entry.createdAt).isSame(day, 'day'),
    entries,
  );
}

export function previousEntry(entries) {
  return reduce(
    maxBy(prop('createdAt')),
    {createdAt: -Infinity},
    entries
  );
}

export function detectCrisis(entry) {
  const overview = values(pick(OVERVIEW_PROPS, entry));
  return contains(1, overview);
}
