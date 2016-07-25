import * as loggingActions from '../actions';
import * as actions from './actions';
import {LOAD} from 'redux-storage';

import {
  ASSOCIATION_TYPES,
  DEFAULT_SIDE_EFFECTS,
  DEFAULT_SYMPTOMS,
} from './constants';

import {
  Association,
  EntryAssociation,
} from './models';

import {
  append,
  assoc,
  assocPath,
  contains,
  differenceWith,
  equals,
  evolve,
  filter,
  identity,
  map,
  merge,
  prop,
  propEq,
  reject,
  values,
} from 'ramda';

import {
  idMap,
  set,
} from '../../lib/state'

export const symptomReducer = createAssociationReducer(
  ASSOCIATION_TYPES.SYMPTOM,
  DEFAULT_SYMPTOMS
);

export const sideEffectReducer = createAssociationReducer(
  ASSOCIATION_TYPES.SIDE_EFFECT,
  DEFAULT_SIDE_EFFECTS
);

function createAssociationReducer(association_type, default_associations) {
  const volatileState = {
    filter: null,
    selected: [],

    newEntryAssociations: {},
    newAssociations: {},
  };

  const persistedState = {
    existingEntryAssociations: {},
    existingAssociations: {},
  }

  const initialState = {
    ...volatileState,
    ...persistedState,
  };

  function load(state) {
    const newAssociations = differenceWith(
      (a, b) => a.name === b.name,
      default_associations,
      values(state.existingAssociations),
    );

    return evolve(
      {existingAssociations: merge(idMap(newAssociations))},
      state
    );
  }

  function reset(state) {
    return merge(state, volatileState);
  }

  function save({id}, state) {
    const enteredEntryAssociations = filter(
      prop('severity'),
      values(state.newEntryAssociations)
    );
    const newEntryAssociations = idMap(map(
      assoc('entryId', id),
      enteredEntryAssociations
    ));
    const newAssociations = idMap(map(
      entryAssociation => state.newAssociations[entryAssociation.associationId],
      values(newEntryAssociations)
    ));

    const savedState = merge(
      state,
      {
        existingEntryAssociations:
          merge(state.existingEntryAssociations, newEntryAssociations),
        existingAssociations:
          merge(state.existingAssociations, newAssociations),
      }
    );
    return reset(savedState);
    }

  function edit(id, state) {
    const cleanState = reset(state);
    const newEntryAssociations = idMap(filter(
      propEq('entryId', id),
      values(state.existingEntryAssociations)
    ));
    return merge(cleanState, {newEntryAssociations});
  }

  function addEntryAssociation(
    {
      entryAssociationId,
      associationId,
    },
    state
  ) {

    // Find an existing object
    const existingAssociation = state.existingAssociations[associationId];
    // Make a new one
    const newAssociation = merge(
      Association,
      {
        id: associationId,
        name: state.filter,
      }
    );

    // Make a new entry association
    const newEntryAssociation = merge(
      EntryAssociation,
      {
        id: entryAssociationId,
        associationId,
      }
    );

    // Put values into state
    return evolve(
      {
        newEntryAssociations: set(newEntryAssociation),
        // only update new assocition list if this is actually new
        newAssociations: existingAssociation ? identity : set(newAssociation),
        filter: () => null,
      },
      state
    );
  }

  function updateEntryAssociation({id, severity}, state) {
    return assocPath(
      ['newEntryAssociations', id, 'severity'],
      Math.round(severity),
      state
    );
  }

  function filterAssociation(filterVal, state) {
    return assoc('filter', filterVal, state);
  }

  function select({id, selected}, state) {
    const transform = selected ? append(id) : reject(equals(id));
    return evolve({selected: transform}, state);
  }

  function removeSelected(state) {
    const rejectedIds = map(
      prop('associationId'),
      state.newEntryAssociations
    );
    return evolve(
      {
        selected: () => [],
        newEntryAssociations: reject(a => contains(a.id, state.selected)),
        newAssociations: reject(a => contains(a.id, rejectedIds)),
      },
      state
    );
  }

  return function associationReducer(state = initialState, action) {
    // only handle actions for the given association type
    if (action.meta && action.meta.associationType !== association_type)
      return state;

    switch (action.type) {
      case LOAD:
        return load(state);

      case loggingActions.RESET_ENTRY:
        return reset(state);

      case loggingActions.SAVE_ENTRY:
        return save(action.payload, state);

      case loggingActions.EDIT_ENTRY:
        return edit(action.payload, state);

      case actions.ADD_ENTRY_ASSOCIATION:
        return addEntryAssociation(action.payload, state);

      case actions.UPDATE_ENTRY_ASSOCIATION:
        return updateEntryAssociation(action.payload, state);

      case actions.FILTER_ASSOCIATION:
        return filterAssociation(action.payload, state);

      case actions.SELECT_ENTRY_ASSOCIATION:
        return select(action.payload, state);

      case actions.REMOVE_SELECTED_ENTRY_ASSOCIATIONS:
        return removeSelected(state);
    }

    return state;
  };
}
