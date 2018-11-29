import axios from 'axios';
import { instanceLocator, tokenUrl } from '../constants';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';
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
export const SERVICE_SEARCH_TAG = 'service_search_tag';
export const CREATE_REVIEW = 'create_review';
export const FETCH_SERVICE_OWNER = 'fetch_service_owner';
export const FETCH_SERVICE_AND_OWNER = 'fetch_service_and_owner';
export const CONNECT_USER_TO_CHAT = 'connect_user_to_chat';
export const FETCH_USERS_ROOMS = 'fetch_users_rooms';
export const CREATE_ROOM = 'create_room';
export const SEND_MESSAGE = 'send_message';


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
        tags: values.category,
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
        tags: values.category,
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

export function fetchServicesByTag(tag, query = '') {
    const data = {
        query: query,
        tags: [tag]
    }

    return axios.post(`${ROOT_URL}/services/searchtags`, data).then((req) => {
        return {
            type: SERVICE_SEARCH_TAG,
            tag: tag,
            payload: req
        };
    });
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

    return axios.post(`${ROOT_URL}/services/search`, data).then((req) => {
        return {
            type: SERVICE_SEARCH,
            payload: req
        };
    });
}

export function fetchServiceAndOwner(serviceID) {
    return axios.get(`${ROOT_URL}/services/${serviceID}`).then((req) => {
        return fetchServiceOwner(req.data.service.owner).then((owner) => {
            req.data.owner = owner.payload.data.user;

            return {
                type: FETCH_SERVICE_AND_OWNER,
                payload: req
            };
        });
    });
}

export function getUserFromLocalStorage() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
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

export function createReview(id, comment, rating, callback = {}) {
    const data = {
        rateing: rating,
        comment: comment,
        serviceId: id,
    }

    return axios.post(`${ROOT_URL}/services/createComment`, data).then((req) => {
        callback();

        return {
            type: CREATE_REVIEW,
            payload: req
        };
    });
}

export function fetchServiceOwner(id) {
    return axios.get(`${ROOT_URL}/users/${id}`).then((req) => {
        return {
            type: FETCH_SERVICE_OWNER,
            payload: req
        };
    });
}

export function connectChat(userId){
    const chatManager = new ChatManager({
        instanceLocator: instanceLocator,
        userId: userId,
        tokenProvider: new TokenProvider({
            url: tokenUrl
        })
    });

    return chatManager.connect().then((currentUser) => {
        return {
            type: CONNECT_USER_TO_CHAT,
            payload: currentUser
        };
    })
}

export function fetchJoinableRooms(currentUser){
    currentUser.getJoinableRooms().then(joinableRooms => {
        return {
            type: FETCH_USERS_ROOMS,
            payload: joinableRooms
        };
    })
}

export function createRoom(currentUser, serviceOwner, roomName){
    const create = currentUser.createRoom({
        name: roomName,
        private: true,
        addUserIds: [`${serviceOwner}`]
    });

    return create.then((room) => {
        return {
            type: CREATE_ROOM,
            payload: room
        };
    })
    .catch(err => {
        if(err.statusCode === 400){
            console.log("User needs to be added to chatkit");
        }
    })
}
