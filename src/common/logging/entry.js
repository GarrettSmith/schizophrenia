import {Record, List} from 'immutable-fns';

const Entry = Record({
  createdAt: null,
  symptoms: Map(),
});

export default Entry;
