import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../redux-config/root-reducer';
import {Map} from 'immutable';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import {modalSaga} from '../sagas/modals';
import {searchAndHighlightSaga} from '../sagas/searchAndHighlight';
import {saveSnippetSaga} from '../sagas/saveSnippet';
import {saveSearchSaga} from '../sagas/saveSearch';
import {savedItemsSaga} from '../sagas/savedItems';
import {databaseTreeSaga} from '../sagas/databaseTrees';
import {criteriaSaga} from '../sagas/criteria';
import {searchAuditTrailSaga} from '../sagas/searchAuditTrail';

const makeStore = () => {
  const sagas = [criteriaSaga, modalSaga,  databaseTreeSaga, searchAndHighlightSaga, searchAuditTrailSaga, saveSnippetSaga, saveSearchSaga, savedItemsSaga];
  const INITIAL_STATE = Map({});
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  if(process.env.NODE_ENV !== 'production') {
    const composeEnhancers = composeWithDevTools({
      name: 'SLaM CRIS Redux store'
    });
    const store = createStore(rootReducer, INITIAL_STATE, composeEnhancers(
      applyMiddleware(...middleware)
    ));
    sagas.forEach(saga => sagaMiddleware.run(saga));
    return store;
  }
  const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(sagaMiddleware));
  sagas.forEach(saga => sagaMiddleware.run(saga));
  return store;

};

export default makeStore();
