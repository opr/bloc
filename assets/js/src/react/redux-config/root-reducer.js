import {combineReducers} from 'redux-immutable';
import searchResults from '../SearchResultsTable/reducer';
import modal from '../ModalContainer/reducer';
import searchAndHighlight from '../SearchAndHighlightModal/reducer';
import saveSnippetButton from '../SaveSnippetButton/reducer';
import saveSnippetModal from '../SaveSnippetModal/reducer';
import saveSearchModal from '../SaveSearchModal/reducer';
import savedItemsTables from '../SavedItemsTable/reducer';
import databaseTrees from '../DatabaseTree/reducer';
import criteria from '../Criteria/reducer';
import searchAuditTrail from '../SearchAuditTrail/reducer';
import {emailClinician} from '../EmailClinician/reducer';

const rootReducer = combineReducers({
  criteria,
  databaseTrees,
  emailClinician,
  modal,
  savedItemsTables,
  saveSearchModal,
  saveSnippetButton,
  saveSnippetModal,
  searchAuditTrail,
  searchAndHighlight,
  searchResults
});

export default rootReducer;
