import {createSelector} from 'reselect';
import * as E from '../../lib/entries';
import {
  prop,
  reverse,
  sortBy,
  values
} from 'ramda';

const entriesSelector = state => state.logging.entries;

function sortEntries(entries) {
  return reverse(sortBy(
    prop('createdAt'),
    values(entries)
  ));
}

export default createSelector(
  [
    entriesSelector,
  ],
  (entries) => ({
    entries: sortEntries(entries),
  })
);
