import {createSelector} from 'reselect';

import {Symptom} from './models';

import {
  contains,
  filter,
  length,
  map,
  merge,
  mergeAll,
  prop,
  toLower,
  values,
} from 'ramda';

const MIN_ENTERED = 3;

const enteredSymptomSelector = state => state.logging.enteredSymptom;
const newEntrySymptomsSelector = state => state.logging.newEntrySymptoms;
const newSymptomsSelector = state => state.logging.newSymptoms;
const symptomsSelector = state => state.logging.symptoms;

function suggestSymptoms(entered, symptoms) {
  if (!entered || length(entered) < MIN_ENTERED) return [];

  const symptomObjs = values(symptoms);
  const existing = filter(
    s => contains(toLower(entered), toLower(s.name)),
    symptomObjs
  );
  const newSymptom = merge(Symptom, {name: entered});
  return [
    newSymptom,
    ...existing,
  ];
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
  [
    enteredSymptomSelector,
    newEntrySymptomsSelector,
    newSymptomsSelector,
    symptomsSelector,
  ],
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
