import { combineReducers } from 'redux';
import ModelsReducer from './reducer_models';
import ActiveGroup from './reducer_activeGroup';

const rootReducer = combineReducers({
  models: ModelsReducer,
  activeGroup: ActiveGroup
});

export default rootReducer;
