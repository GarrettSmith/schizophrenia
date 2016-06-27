import {createSelector} from 'reselect';
import * as E from '../../lib/entries';
import {values} from 'ramda';

const entriesSelector = state => state.logging.entries;

export default createSelector(
  [
    entriesSelector,
  ],
  (entries) => ({
    entries: E.createdOnDay(Date.now(), values(entries)),
  })
);
