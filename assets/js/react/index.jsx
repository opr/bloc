import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import UserProfile from "./UserProfile/UserProfile";

const getRenderFunc = app => {
  return () => {
    render(app.component, app.element, app.name);
  };
};

const render = (Component, element, name) => {
  ReactDOM.render(
    <AppContainer name={name}>
      {Component}
    </AppContainer>,
    element
  );
};

const elements = {
  userProfile: document.getElementById('user-profile__react-anchor')
};

let apps = [];

if (elements.userProfile) {
  apps.push({
    element: elements.userProfile,
    component: <UserProfile/>,
    file: './UserProfile/UserProfile',
    name: 'UserProfile'
  });
}


for (let a of apps) {
  a.element ? getRenderFunc(a)() : null;
  module.hot ? module.hot.accept(getRenderFunc(a)()) : null;
}
