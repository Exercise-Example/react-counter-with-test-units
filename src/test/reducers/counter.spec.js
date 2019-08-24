import expect from 'expect';
import counter from '../../reducers/counter';
import { INCREMENT, DECREMENT} from '../../actions';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counter(undefined, {})).toBe(120);
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(counter(1, { type: INCREMENT })).toBe(2);
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(counter(3, { type: DECREMENT })).toBe(2);
    });

    it('should handle unknown action type', () => {
      expect(counter(1, { type: 'unknown' })).toBe(1);
    });
  });
});
