import { combineReducers } from 'redux';
import ModelsReducer from './reducer_models';
import ActiveGroup from './reducer_activeGroup';
import ActiveTarget from './reducer_activeTarget';
import ActiveUser from './reducer_activeUser';
import Auth from './reducer_auth';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
  models: ModelsReducer,
  activeGroup: ActiveGroup,
  activeTarget: ActiveTarget,
  form: formReducer,
  user: ActiveUser,
  isAuthenticated:Auth
});

export default rootReducer;
