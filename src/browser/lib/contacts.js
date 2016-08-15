import {
  flatten,
  map,
} from 'ramda';

const {contacts} = navigator;

export function select() {
  return new Promise(contacts.pickContact);
}

export function find(ids) {
  const idArray = flatten([ids]);

  const promises = map(
    id => new Promise((resolve, reject) => {
      contacts.find(
        [contacts.fieldType.id],
        resolve,
        reject,
        {filter: id}
      );
    }),
    ids
  );

  return Promise.all(promises);
}
