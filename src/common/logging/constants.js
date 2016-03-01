import shortid from 'shortid';
import {Symptom} from './models';

import {
  fromPairs,
  map,
  merge,
} from 'ramda';

const DEFAULT_SYMPTOM_NAMES = [
  'Done something I deserve to be punished for',
  'Eaten regular meals',
  'Feel that my thoughts are disorganized',
  'Felt good about myself',
  'Felt low energy',
  'Felt unusual sensations',
  'Had a special mission or abilities',
  'Had others see/hear my thoughts',
  'Had something want to hurt me',
  'Had the urge to harm myself',
  'Had the urge to kill myself',
  'Had thoughts that were not mine',
  'Heard voices',
  'Seen visions',
  'Slept well at night',
  'Spent time outside',
];

// Create symptom objects from the names
export const DEFAULT_SYMPTOMS = fromPairs(map(
  name => {
    const id = shortid.generate();
    const symptom = merge(Symptom, {id, name});
    return [id, symptom];
  },
  DEFAULT_SYMPTOM_NAMES
));
