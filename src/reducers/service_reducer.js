import _ from 'lodash';
import { SERVICE_SEARCH_TAG, SET_SERVICE_TO_EDIT, FETCH_ALL_SERVICES, CREATE_SERVICE, SERVICE_SEARCH, SERVICE_VIEW, FETCH_USERS_SERVICES, EDIT_SERVICE, DELETE_SERVICE } from '../actions';

export default function(state = {}, action) {   
    switch (action.type) {
        case FETCH_ALL_SERVICES: 
            return { 
                ...state,
                services: action.payload.data.services
             }
        case CREATE_SERVICE:
            return state;
        case EDIT_SERVICE:
             return state;
        case DELETE_SERVICE:
            if (action.payload.status == 200) {
                return {
                    ...state,
                    services: action.payload.data.services
                };
            }
            return state;
        case SERVICE_SEARCH:
            return { 
                ...state,
                services: action.payload.data.results
             };
        case SERVICE_VIEW:
            return { 
                ...state,
                service: action.payload.data.service
             };
        case SERVICE_SEARCH_TAG:
            if (action.payload.status == 200){
                return { 
                    ...state,
                    exploreServices: { 
                        ...state.exploreServices,
                        [action.tag]: action.payload.data.results
                    }
                };
            }
            else
                return {
                    ...state,
                    exploreServices: {
                        ...state.exploreServices, 
                        [action.tag]: null
                    }
                };
        case FETCH_USERS_SERVICES:
            if (action.payload.status == 200){
                return { 
                    ...state,
                    accountServices: action.payload.data.userServices
                 };
            }
            else
                return {
                    ...state,
                    accountServices: null
                };
        case SET_SERVICE_TO_EDIT:
            return {
                ...state,
                serviceToEdit: action.payload
            };
        default:
            return state;
    }
}