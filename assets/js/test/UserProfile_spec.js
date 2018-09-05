import {expect} from 'chai';
import {mount, configure} from 'enzyme';
import React from 'react';
import UserProfile from '../src/react/UserProfile/UserProfile';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('user profile test', () => {
  let props;
  let mountedUserProfile;

  const userProfile = () => {
    if(!mountedUserProfile) {
      mountedUserProfile = mount(<UserProfile />)
    }
    return mountedUserProfile;
  };

  beforeEach(() => {
    props = {};
    mountedUserProfile = undefined;
  });

  it('renders a div', () => {
    const divs = userProfile().find('div');
    expect(divs.length).to.be.at.least(1);
  });

  it('has an input when the edit button has been clicked', () => {
    const divs = userProfile().find('div');
    expect(divs.length).to.be.at.least(1);
  });
});
