import axios from 'axios';

export const ROOT_URL = '';
export const API_KEY = '';
export const CREATE_USER = 'create_user';
export const CREATE_SERVICE = 'create_service';

export function createUser() {
    const request = axios.get(`${ROOT_URL}/createUser${API_KEY}`);

    return {
        type: CREATE_USER,
        payload: request
    };
}

export function createService() {
    const request = axios.get(`${ROOT_URL}/createService${API_KEY}`);

    return {
        type: CREATE_SERVICE,
        payload: request
    };
}