import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import TestInput from './TestInput/TestInput'
import SecondTest from './SecondTest/SecondTest';

const getRenderFunc = app => {
  return () => {
      render(app.component, app.element, app.name);
  }
};

const render = (Component, element, name) => {
    ReactDOM.render(
        <AppContainer name={name}>
            {Component}
        </AppContainer>,
        element
    )
};

let apps = [
    {element: document.getElementById('test-input-anchor'), component: <TestInput/>, file: './TestInput/TestInput', name: 'TestInput'},
    {element: document.getElementById('second-test-anchor'), component: <SecondTest/>, file: './SecondTest/SecondTest', name: 'SecondTest'}
];

for (let a of apps) {
    a.element ? getRenderFunc(a)() : null;
    module.hot ? module.hot.accept(getRenderFunc(a)()) : null;
}