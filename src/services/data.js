import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Implement application-specific requests
export async function getItems() {
    return await api.get(host + '/data/posts?sortBy=_createdOn%20desc');
}

export async function createItem(item) {
    return await api.post(host + '/data/posts', item);
}

export async function getItemById(id) {
    return await api.get(host + '/data/posts/' + id);
}

export async function editItem(itemId, item) {
    return await api.put(host + '/data/posts/' + itemId, item);
}

export async function getCarProfile() {
    const userID = sessionStorage.getItem('userId');
    console.log(userID);
    return await api.get(host + '/data/cars?where=_ownerId%3D%22' + userID + '%22&sortBy=_createdOn%20desc');
}

export async function deleteItem(id) {
    return await api.del(host + '/data/posts/' + id);
}
