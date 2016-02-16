import {createSelector} from 'reselect';

import {
  contains,
  filter,
  map,
  prop,
} from 'ramda';

const symptomsSelector = state => state.logging.symptoms;
const enteredSymptomSelector = state => state.logging.enteredSymptom;

function suggestSymptoms(entered, symptoms) {
  const names = map(prop('name'), symptoms);
  return filter(contains(entered), names);
}

export default createSelector(
  enteredSymptomSelector,
  symptomsSelector,
  (entered, symptoms) => ({
    suggestedSymptoms: suggestSymptoms(entered, symptoms),
  })
);
