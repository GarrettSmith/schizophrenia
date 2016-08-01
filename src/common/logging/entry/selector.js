import {createSelector} from 'reselect';
import {
  values,
} from 'ramda';
import {previousEntry} from '../../lib/entries';

const entriesSelector = state => state.logging.entries;

export const previousEntrySelector = createSelector(
  [
    entriesSelector,
  ],
  entries => previousEntry(values(entries))
);

export default createSelector(
  [
    previousEntrySelector,
  ],
  previousEntry => ({
    previousEntry,
  })
);
