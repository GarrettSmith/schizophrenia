import moment from 'moment';
import {DATE_FORMATS} from './constants';

export function format(date) {
  return moment(date).calendar(null, DATE_FORMATS)
}
