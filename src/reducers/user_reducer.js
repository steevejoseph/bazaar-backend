import _ from 'lodash';
import { CREATE_USER } from '../actions';

export default function(state = {}, action) {
    
    
    switch (action.type) {
        case CREATE_USER: 
            console.log(action);
            return state;
        default:
            return state;
    }
}