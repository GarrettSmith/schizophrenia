import {combineReducers} from 'redux';
import {reduxFields} from '../lib/redux-fields';

// Note we are composing all reducers. Web, native, whatever. Of course we can
// pass platform specific reducers in configureStore, but there is no reason to
// do that, until app is really large.
import device from '../device/reducer';
import intl from '../intl/reducer';
import logging from '../logging/reducer';
import ui from '../ui/reducer';

const appReducer = combineReducers({
  device,
  intl,
  logging,
  reduxFields,
  ui,
});

export default appReducer;
