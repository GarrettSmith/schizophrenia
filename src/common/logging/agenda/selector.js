import {createSelector} from 'reselect';
import * as E from '../../lib/entries';
import {
  concat,
  map,
  merge,
  prop,
  reverse,
  sortBy,
  values
} from 'ramda';

const logSelector = state => state.logging.entries;
const journalSelector = state => state.journal.entries;

function tagTypes(type, entries) {
  return map(
    merge({type}),
    values(entries)
  );
}

function sortEntries(logEntries, journalEntries) {
  const entries = concat(
    tagTypes('log', logEntries),
    tagTypes('journal', journalEntries)
  );
  return reverse(sortBy(
    prop('createdAt'),
    entries
  ));
}

export default createSelector(
  [
    logSelector,
    journalSelector,
  ],
  (logEntries, journalEntries) => ({
    entries: sortEntries(logEntries, journalEntries),
  })
);
