import {createAction} from 'redux-actions';

export const ADD_CONTACT = 'ADD_CONTACT';

export const actions = {
  addContact: createAction(ADD_CONTACT),
};
