import {createSelector} from 'reselect';
import {
  values,
} from 'ramda';
import {previousEntry} from '../../lib/entries';

const entriesSelector = state => state.logging.entries;

export default createSelector(
  [
    entriesSelector,
  ],
  (entries) => ({
    previousEntry: previousEntry(values(entries)),
  })
);
