import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user_reducer';
import serviceReducer from './service_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    services: serviceReducer
});

export default rootReducer;
m