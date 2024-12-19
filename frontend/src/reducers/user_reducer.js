import _ from 'lodash';
import { CREATE_USER, LOGIN, GET_USER_FROM_LOCAL_STORAGE, LOG_OUT_USER, 
    FETCH_SERVICE_AND_OWNER, ADD_FAVORITE } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case CREATE_USER:
            if (action.payload.status === 201) {
                localStorage.setItem('loggedInUser', JSON.stringify(action.payload.data.createdUser))
                localStorage.setItem('token', JSON.stringify(action.payload.data.token))
                return {
                    ...state,
                    loggedIn: true,
                    user: action.payload.data.createdUser,
                };
            }
            return state;
        case LOGIN:
            if (action.payload.status === 200) {
                localStorage.setItem('loggedInUser', JSON.stringify(action.payload.data.user))
                localStorage.setItem('token', JSON.stringify(action.payload.data.token))
                return {
                    ...state,
                    loggedIn: true,
                    user: action.payload.data.user,
                };
            }
            return state;
        case GET_USER_FROM_LOCAL_STORAGE:
            return {
                ...state,
                loggedIn: true,
                user: JSON.parse(localStorage.getItem('loggedInUser')),
            }
        case LOG_OUT_USER:
            return {
                user: null,
                loggedIn: false,
            }
        case FETCH_SERVICE_AND_OWNER:
            return {
                ...state,
                serviceOwner: action.payload.data.owner
            }
        case ADD_FAVORITE:
            if (action.payload.status === 200) {
                localStorage.setItem('loggedInUser', JSON.stringify(action.payload.data.result))
                return {
                    ...state,
                    user: action.payload.data.result
                }
            }
            return state;
        default:
            return state;
    }
}