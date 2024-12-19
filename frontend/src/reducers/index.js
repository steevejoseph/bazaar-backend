import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user_reducer';
import serviceReducer from './service_reducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    services: serviceReducer,
    chat: chatReducer
});

export default rootReducer;
