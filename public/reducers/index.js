import { combineReducers } from 'redux';
import ModelsReducer from './reducer_models';
import ActiveGroup from './reducer_activeGroup';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  models: ModelsReducer,
  activeGroup: ActiveGroup,
  form: formReducer
});

export default rootReducer;
