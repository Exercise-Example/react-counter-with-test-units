import expect from 'expect';
import * as actions from '../../actions';

describe('actions', () => {
  describe('counter', () => {
    it('increment should create increment action', () => {
      expect(actions.onIncrement()).toEqual({ type: actions.INCREMENT });
    });

    it('decrement should create decrement action', () => {
      expect(actions.onDecrement()).toEqual({ type: actions.DECREMENT });
    });
    
  });
});
