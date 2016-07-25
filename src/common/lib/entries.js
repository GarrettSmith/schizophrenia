import moment from 'moment';
import {
  filter,
  maxBy,
  prop,
  reduce,
} from 'ramda';

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
