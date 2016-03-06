import {
  createdOnDay,
} from '../entries';

import {expect} from '../../../../test/mochaTestHelper';

describe('entries', () => {
  describe('createOnDay()', () => {
    it('returns entries created on the given day', () => {
      const matchingDay = new Date(2015, 3, 5);
      const matchingEntries = [
        {createdAt: matchingDay},
        {createdAt: matchingDay},
        {createdAt: matchingDay},
      ];
      const otherEntries = [
        {createdAt: new Date(2015, 3, 6)},
        {createdAt: new Date(2015, 5, 6)},
        {createdAt: new Date(2015, 3, 3)},
      ];
      const allEntries = [
        ...matchingEntries,
        ...otherEntries,
      ];
      expect(createdOnDay(matchingDay, allEntries)).to.eql(matchingEntries);
    });
  });
});
