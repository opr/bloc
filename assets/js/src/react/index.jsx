import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import UserProfile from './UserProfile/UserProfile';

const getRenderFunc = app => {
  return () => {
    render(app.component, app.element, app.name, app.hydrate);
  };
};

const render = (Component, element, name, hydrate = false) => {
  const renderOrHydrate = hydrate ? ReactDOM.hydrate : ReactDOM.render;
  renderOrHydrate(
    <AppContainer name={name}>
      {Component}
    </AppContainer>,
    element
  );
};
const elements = {
  userProfile: document.getElementsByClassName('user-profile__react-anchor')
};

const apps = [];

if (elements.userProfile.length > 0) {
  apps.push(...Array.from(elements.userProfile).map(element => ({
    element,
    component: <UserProfile/>,
    file: './UserProfile/UserProfile',
    name: 'UserProfile'
  })));
}


for (const app of apps) {
  app.element ? getRenderFunc(app)() : null;
  module.hot ? module.hot.accept(getRenderFunc(app)()) : null;
}
