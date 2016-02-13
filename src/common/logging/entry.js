import {Record, List} from 'immutable-fns';

const Entry = Record({
  createdAt: new Date,
  sczSymptoms: new List,
});

export default Entry;
