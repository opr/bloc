import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import {JSDOM} from 'jsdom';

const {window} = new JSDOM('<!doctype html><html><body></body></html>');
global.document = window.document;
global.window = window;
global.navigator = {
  userAgent: 'node.js',
};
chai.use(chaiImmutable);
