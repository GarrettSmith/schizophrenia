import {LOAD} from 'redux-storage';
import * as actions from './actions';
import {
  TIME_SCALES,
  TIME_INTERVAL_DIRECTIONS,
  OVERVIEW_DIMENSIONS,
  OPTIONAL_DIMENSIONS,
} from './constants';
import {
  AssociationDimension,
} from './models';

import {
  concat,
  differenceWith,
  evolve,
  assocPath,
  map,
  merge,
  values,
} from 'ramda';
import moment from 'moment';
import {idMap} from '../lib/state';

const initialState = {
  dimensions: {},
  timeScale: TIME_SCALES.WEEK,
  timeIntervalMarker: moment(),
};

function load(loading, state) {
  const existingDimensions = values(state.dimensions);

  const defaultDimensions = concat(
    OVERVIEW_DIMENSIONS,
    OPTIONAL_DIMENSIONS,
  );
  const newDefaultDimensions = differenceWith(
    (a, b) => a.prop === b.prop,
    defaultDimensions,
    existingDimensions
  );

  const symptomDimensions = associationDimensions(
    'symptom',
    loading.symptom.existingAssociations
  );
  const sideEffectDimensions = associationDimensions(
    'sideEffect',
    loading.sideEffect.existingAssociations
  );
  const allAssociationDimensions = concat(
    symptomDimensions,
    sideEffectDimensions
  );
  const newAssociationDimensions = differenceWith(
    (a, b) => a.associationId === b.associationId,
    allAssociationDimensions,
    existingDimensions
  );

  const newDimensions = concat(
    newDefaultDimensions,
    newAssociationDimensions
  );

  return evolve(
    {
      dimensions: merge(idMap(newDimensions))
    },
    state
  );
}

function associationDimensions(associationType, associations) {
   return map(
    association => merge(
      AssociationDimension,
      {
        associationId: association.id,
        category: associationType,
        id: association.id,
        name: association.name,
      }
    ),
    values(associations)
  );
}

function setTimeScale(timeScale, state) {
  const resetIntervalState = changeTimeInterval(
    TIME_INTERVAL_DIRECTIONS.NOW,
    state
  );
  return merge(resetIntervalState, {timeScale});
}

function changeTimeInterval(direction, state) {
  const {
    timeIntervalMarker,
    timeScale,
  } = state;

  const newMarker = {
    [TIME_INTERVAL_DIRECTIONS.NOW]:
      () => moment(),

    [TIME_INTERVAL_DIRECTIONS.PREVIOUS]:
      () =>  moment(timeIntervalMarker).subtract(1, timeScale),

    [TIME_INTERVAL_DIRECTIONS.NEXT]:
      () => moment(timeIntervalMarker).add(1, timeScale),
  }[direction]();

  return merge(state, {timeIntervalMarker: newMarker});
}

function toggleDimension({id, enable}, state) {
  return assocPath(
    ['dimensions', id, 'enabled'],
    enable,
    state
  );
}

export default function loggingReducer(state = initialState, action) {
  switch(action.type) {
    case LOAD:
      return load(action.payload, state);

    case actions.SET_TIME_SCALE:
      return setTimeScale(action.payload, state);

    case actions.CHANGE_TIME_INTERVAL:
      return changeTimeInterval(action.payload, state);

    case actions.TOGGLE_DIMENSION:
      return toggleDimension(action.payload, state);
  }

  return state;
}
