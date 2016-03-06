import moment from 'moment';
import {filter} from 'ramda';

export function createdOnDay(date, entries) {
  const day = moment(date);
  return filter(
    entry => moment(entry.createdAt).isSame(day, 'day'),
    entries,
  );
}

