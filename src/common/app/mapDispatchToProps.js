import * as authActions from '../auth/actions';
import * as switchActions from '../switch/actions';
import * as todosActions from '../todos/actions';
import * as uiActions from '../ui/actions';
import {Map} from 'immutable';
import {bindActionCreators} from 'redux';

const actions = [
  authActions,
  switchActions,
  todosActions,
  uiActions
];

export default function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}
