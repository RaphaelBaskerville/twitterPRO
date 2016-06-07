import { combineReducers } from 'redux';
import ModelsReducer from './reducer_models';
import ActiveGroup from './reducer_activeGroup';
import ActiveUser from './reducer_activeUser';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  models: ModelsReducer,
  activeGroup: ActiveGroup,
  form: formReducer,
  user: ActiveUser
});

export default rootReducer;
