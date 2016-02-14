import * as actions from './actions';

import {assoc} from 'ramda';

const initialState = {
  isMobile: false,
  platform: ''
};

export default function deviceReducer(state = initialState, action) {

  switch (action.type) {

    case actions.SET_PLATFORM: {
      return assoc('platform', action.payload.platform, state);
    }

  }

  return state;
}
