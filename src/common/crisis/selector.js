import {createSelector} from 'reselect';

import {previousEntrySelector} from '../logging/entry/selector';

import {
  isNil,
} from 'ramda';
import moment from 'moment';

const RECENT_THRESHOLD = {
  SCALE: 'hour',
  SIZE: 1,
};

function showCrisisWarning(previousEntry) {
  const recentThreshold = moment().subtract(
    RECENT_THRESHOLD.SIZE,
    RECENT_THRESHOLD.SCALE
  );
  const recent = moment(previousEntry.createdAt).isAfter(recentThreshold);
  const {
    crisisOccurred,
    crisisResolved,
  } = previousEntry;
  return recent && crisisOccurred && isNil(crisisResolved);
}

export default createSelector(
  [
    previousEntrySelector,
  ],
  (
    previousEntry,
  ) => ({
    showCrisisWarning: showCrisisWarning(previousEntry),
    previousEntry,
  })
);
