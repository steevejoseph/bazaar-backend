import _ from 'lodash';
import { CREATE_USER, CREATE_SERVICE } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_SERVICE:
            return _.omit(state, action.payload);
        case CREATE_USER:
            return _.mapKeys(action.payload.data, 'id');
        case CREATE_SERVICE:
            return { ...state, [action.payload.data.id]: action.payload.data }
        default:
            return state;
    }
}