import {fromJS, Map} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with the connect reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Javascript', 'HTML5']
    });
    expect(store.getState()).to.equal(fromJS({
      entries: ['Javascript', 'HTML5']
    }));
  })
});
