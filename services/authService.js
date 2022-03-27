import { JsonRequest } from '../helpers/jsonRequest'

let baseUrl = 'http://localhost:3000/data/users'

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  let user = localStorage.getItem('user') === null
    ? undefined
    : JSON.parse(localStorage.getItem('user'));
  return user;
}

async function login(user) {
  let result = await JsonRequest(`${baseUrl}/login`, 'Post', user)
}

async function register(user) {
  let result = await JsonRequest(`${baseUrl}/register`, 'Post', user)
  setUser(result);
}

async function logout(user) {
  let result = await JsonRequest(`${baseUrl}/logout`, 'Get', undefined, true, true)
  localStorage.clear();
}

export default {
  setUser,
  getUser,
  login,
  register,
  logout
}
