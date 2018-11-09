import axios from 'axios';

export const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';
export const CREATE_USER = 'create_user';
export const CREATE_SERVICE = 'create_service';
export const LOGIN = 'login';
export const SERVICE_SEARCH = 'service_search';
export const FETCH_SERVICES = 'festch_services';
export const FETCH_USER = 'fetch_user';

export function login(values, callback) {
    const data = {
        email: values.email,
        password: values.password
    };
    const request = axios.post(`${ROOT_URL}/users/login`, data)
    .then(() => callback());

    return {
        type: LOGIN,
        payload: request
    };
}

export function createUser(values, callback) {
    const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
    };
    const request = axios.post(`${ROOT_URL}/users/signup`, data)
    .then(() => callback());

    return {
        type: CREATE_USER,
        payload: request
    };
}

export function createService(values, callback) {
    const data = {
        name: values.name,
        description: values.description,
        tags: values.tags
    };
    const request = axios.post(`${ROOT_URL}/services/create`, data)
    .then(() => callback());

    return {
        type: CREATE_SERVICE,
        payload: request
    };
}