import {expect} from 'chai';
import addNumber from '../src/modules/addNumber';

describe('add number test', () => {

  it('adds 1 and 2 and gets 3', () => {
    const c = addNumber(1,2);
    expect(c).to.equal(3);
  });
});
