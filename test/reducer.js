import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Javascript']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Javascript']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Javascript', 'HTML5']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Javascript', 'HTML5']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Javascript', 'HTML5']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Javascript'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Javascript', 'HTML5'],
        tally: {'Javascript': 1}
      },
      entries: []
    }));
  });

  it('has an inital sate', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Javascript']};
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      entries: ['Javascript']
    }));
  });

  it('can be used with reduce', () => {
  const actions = [
    {type: 'SET_ENTRIES', entries: ['Javascript', 'HTML5']},
    {type: 'NEXT'},
    {type: 'VOTE', entry: 'Javascript'},
    {type: 'VOTE', entry: 'HTML5'},
    {type: 'VOTE', entry: 'Javascript'},
    {type: 'NEXT'}
  ];
  const finalState = actions.reduce(reducer, Map());

  expect(finalState).to.equal(fromJS({
    winner: 'Javascript'
  }));
});

});
