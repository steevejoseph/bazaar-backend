import axios from 'axios';

export const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';
export const CREATE_USER = 'create_user';
export const CREATE_SERVICE = 'create_service';
export const LOGIN = 'login';
export const SERVICE_SEARCH = 'service_search';
export const FETCH_ALL_SERVICES = 'fetch_services';
export const FETCH_USER = 'fetch_user';
export const GET_USER_FROM_LOCAL_STORAGE = 'get_local_from_storage';
export const LOG_OUT_USER = 'log_out';

export function login(values, callback) {
    const data = {
        email: values.email,
        password: values.password
    };

    return {
        type: LOGIN,
        payload: axios.post(`${ROOT_URL}/users/login`, data)
    };
}

export function createUser(values, callback) {
    const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
    };

    return {
        type: CREATE_USER,
        payload: axios.post(`${ROOT_URL}/users/signup`, data)
    };
}

export function createService(values, callback) {
    const data = {
        name: values.name,
        tags: values.tags,
        description: values.description
    };

    return {
        type: CREATE_SERVICE,
        payload: axios.post(`${ROOT_URL}/services/create`, data)
    };
}

export function fetchServices() {
    return {
        type: FETCH_ALL_SERVICES,
        payload: axios.get(`${ROOT_URL}/services`)
    }
}

export function serviceSearch(term){
    const data = {
        query: term
    }

    return {
        type: SERVICE_SEARCH,
        payload: axios.post(`${ROOT_URL}/services/search`, data)
    };
}

export function getUserFromLocalStorage() { 
        return {
            type: GET_USER_FROM_LOCAL_STORAGE,
            payload: localStorage.getItem('loggedInUser')
        };
}

export function logOutUser() {
    localStorage.removeItem('loggedInUser');
    return {
        type: LOG_OUT_USER
    }
}