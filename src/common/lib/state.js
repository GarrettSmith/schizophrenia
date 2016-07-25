import {
  assoc,
  curry,
  fromPairs,
  map,
  prop,
} from 'ramda';

export function idMap(array) {
  return fromPairs(map(
    x => x ? [x.id, x] : null,
    array
  ));
}

const _associate = (foreignKey, associationName, associations, objs) => map(
  o => {
    const key = prop(foreignKey, o);
    const association = prop(key, associations);
    return {
      ...o,
      [associationName]: association,
    };
  },
  objs
);
export const associate = curry(_associate);

// set obj into id maps
export const set = curry((obj, map) => assoc(obj.id, obj, map));
