import axios from 'axios';

export const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';
export const CREATE_USER = 'create_user';
export const CREATE_SERVICE = 'create_service';
export const EDIT_SERVICE = 'edit-service';
export const DELETE_SERVICE = 'delete_service';
export const LOGIN = 'login';
export const SERVICE_SEARCH = 'service_search';
export const SERVICE_VIEW = 'service_view';
export const FETCH_ALL_SERVICES = 'fetch_services';
export const FETCH_USER = 'fetch_user';
export const FETCH_USERS_SERVICES = 'fetch_users_services';
export const GET_USER_FROM_LOCAL_STORAGE = 'get_local_from_storage';
export const LOG_OUT_USER = 'log_out';
export const SET_SERVICE_TO_EDIT = 'set_service_to_edit';

export function login(values, callback) {
    const data = {
        email: values.email,
        password: values.password
    };

    return axios.post(`${ROOT_URL}/users/login`, data).then((req) => {
        callback();

        axios.defaults.headers.common['Authorization'] = `Bearer ${req.data.token}`;
        return {
            type: LOGIN,
            payload: req
        };
    });
}

export function createUser(values, callback) {
    const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
    };
    
    return axios.post(`${ROOT_URL}/users/signup`, data).then((req) => {
        callback();

        axios.defaults.headers.common['Authorization'] = `Bearer ${req.data.token}`;
        return {
            type: CREATE_USER,
            payload: req
        };
    });
}

export function createService(values, callback) {
    const data = {
        name: values.serviceName,
        //tags: values.category,
        description: values.description,
        owner: values.user._id,
        price: values.price
    };

    return axios.post(`${ROOT_URL}/services/create`, data).then((req) => {
        callback(req.data.createdService._id);

        return {
            type: CREATE_SERVICE,
            payload: req
        };
    });
}

export function editService(values, callback) {
    const data = {
        name: values.serviceName,
        //tags: values.category,
        description: values.description,
        price: values.price,
        id: values.id
    };

    return axios.post(`${ROOT_URL}/services/edit`, data).then((req) => {
        callback();

        return {
            type: EDIT_SERVICE,
            payload: req
        };
    });
}

export function deleteService(id, callback) {
    const data = {
        id: id
    };
    
    return axios.post(`${ROOT_URL}/services/delete`, data).then((req) => {
        callback();

        return {
            type: DELETE_SERVICE,
            payload: req
        };
    });
}

export function fetchServices() {
    return {
        type: FETCH_ALL_SERVICES,
        payload: axios.get(`${ROOT_URL}/services`)
    }
}

export function fetchUsersServices(userID){
    return {
        type: FETCH_USERS_SERVICES, 
        payload: axios.get(`${ROOT_URL}/services/user/${userID}`)
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

export function serviceView(id) {
    return {
        type: SERVICE_VIEW,
        payload: axios.get(`${ROOT_URL}/services/${id}`)
    };
}

export function getUserFromLocalStorage() {
        return {
            type: GET_USER_FROM_LOCAL_STORAGE,
            payload: JSON.parse(localStorage.getItem('loggedInUser'))
        };
}

export function logOutUser() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    return {
        type: LOG_OUT_USER
    }
}

export function setServiceToEdit(service) {
    return {
        type: SET_SERVICE_TO_EDIT,
        payload: service
    }
}