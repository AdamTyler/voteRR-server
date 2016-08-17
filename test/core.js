import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    // it('adds the entries to the state', () => {
    //   const state = Map();
    //   const entries = List.of('Javascript', 'HTML5');
    //   const nextState = setEntries(state, entries);
    //   expect(nextState).to.equal(Map({
    //     entries: List.of('Javascript', 'HTML5')
    //   }));
    // });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Javascript', 'HTML5'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Javascript', 'HTML5')
      }));
    });

  });

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Javascript', 'HTML5', 'CSS3')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5')
        }),
        entries: List.of('CSS3')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5'),
          tally: Map({
            'Javascript': 4,
            'HTML5': 2
          })
        }),
        entries: List.of('CSS3', 'PHP', 'Ruby')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('CSS3', 'PHP')
        }),
        entries: List.of('Ruby', 'Javascript')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5'),
          tally: Map({
            'Javascript': 3,
            'HTML5': 3
          })
        }),
        entries: List.of('CSS3', 'PHP', 'Ruby')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('CSS3', 'PHP')
        }),
        entries: List.of('Ruby', 'Javascript', 'HTML5')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5'),
          tally: Map({
            'Javascript': 4,
            'HTML5': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Javascript'
      }));
    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5')
        }),
        entires: List()
      });
      const nextState = vote(state, 'Javascript');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5'),
          tally: Map({
            'Javascript': 1
          })
        }),
        entires: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5'),
          tally: Map({
            'Javascript': 3,
            'HTML5': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Javascript');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Javascript', 'HTML5'),
          tally: Map({
            'Javascript': 4,
            'HTML5': 2
          })
        }),
        entries: List()
      }));
    });

  });

});
