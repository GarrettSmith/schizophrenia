import {createSelector} from 'reselect';

import {
  map,
  prop,
} from 'ramda';

const symptomsSelector = state => state.logging.symptoms;
const routeSelector = state => state.ui.currentRoute;

export default createSelector(
  symptomsSelector,
  symptoms => ({
    suggestedSymptoms: map(prop('name'), symptoms),
  })
);
