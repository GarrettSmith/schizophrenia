import {ui} from '../ui/actions';

import {bindActionCreators} from 'redux';
import {map} from 'ramda';

const actionCreators = {
  ui,
};

export default function mapDispatchToProps(dispatch) {
  const actions = map(
    creators => bindActionCreators(creators, dispatch),
    actionCreators
  );
  return {
    actions,
    dispatch
  };
}
