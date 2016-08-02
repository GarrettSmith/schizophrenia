import {
  merge,
} from 'ramda';

export const Dimension = {
  id: null,
  name: null,
  color: null,
  enabled: false,
  category: null,
};

export const AssociationDimension = merge(Dimension, {
  associationType: null,
  associationId: null,
});

export const PropDimension = merge(Dimension, {
  prop: null,
});
