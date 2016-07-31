import moment from 'moment';
import {DATE_FORMATS} from './constants';

export function format(date) {
  return moment().calendar(null, DATE_FORMATS)
}
