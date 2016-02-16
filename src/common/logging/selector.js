import {createSelector} from 'reselect';

import {
  contains,
  filter,
  map,
  mergeAll,
  prop,
  values,
} from 'ramda';

const enteredSymptomSelector = state => state.logging.enteredSymptom;
const newEntrySymptomsSelector = state => state.logging.newEntrySymptoms;
const newSymptomsSelector = state => state.logging.newSymptoms;
const symptomsSelector = state => state.logging.symptoms;

function suggestSymptoms(entered, symptoms) {
  const symptomObjs = values(symptoms);
  return filter(s => contains(entered, s.name), symptomObjs);
}

function associateEntrySymptoms(entrySymptoms, ...symptoms) {
  const mergedSymptoms = mergeAll(symptoms);
  return map(
    es => ({
      ...es,
      symptom: prop(es.symptomId, mergedSymptoms),
    }),
    entrySymptoms
  );
}

export default createSelector(
  enteredSymptomSelector,
  newEntrySymptomsSelector,
  newSymptomsSelector,
  symptomsSelector,
  (
    entered,
    newEntrySymptoms,
    newSymptoms,
    symptoms
  ) => ({
    suggestedSymptoms: suggestSymptoms(entered, symptoms),
    newEntrySymptoms:
      associateEntrySymptoms(newEntrySymptoms, symptoms, newSymptoms),
  })
);
