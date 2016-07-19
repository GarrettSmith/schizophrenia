import shortid from 'shortid';
import {Association} from './models';

import {
  fromPairs,
  map,
  merge,
} from 'ramda';

export const ASSOCIATION_TYPES = {
  SYMPTOM: 'SYMPTOM',
  SIDE_EFFECT: 'SIDE_EFFECT',
};

const makeAssociations = map(name => {
  const id = shortid.generate();
  return merge(Association, {id, name});
});

export const DEFAULT_SYMPTOMS = makeAssociations([
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
]);

export const DEFAULT_SIDE_EFFECTS = makeAssociations([
  'Felt dizzy',
  'Felt rapid heartbeat',
  'Felt sedated (groggy/tired)',
  'Felt stiffness',
  'Had menstrual problems',
  'Had muscle spasms',
  'Had restlessness',
  'Had shakiness',
]);
