import {expect} from 'chai';
import {List} from 'immutable';

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

  describe('A List', () => {

    function addItem(currentState, item) {
      return currentState.push(item);
    }

    it('is immutable', () => {
      let state = List.of('Javascript', 'HTML5');
      let nextState = addItem(state, 'CSS3');

      expect(nextState).to.equal(List.of(
        'Javascript',
        'HTML5',
        'CSS3'
      ));
      expect(state).to.equal(List.of(
        'Javascript',
        'HTML5'
      ));
    });

  });

});
