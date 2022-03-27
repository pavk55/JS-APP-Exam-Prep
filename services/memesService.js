import { JsonRequest } from '../helpers/jsonRequest'

let baseUrl = 'http://localhost:3000/data/memes'

async function getAll() {
  let result = await JsonRequest(baseUrl);
}

async function get(id) {
  let result = await JsonRequest(`${baseUrl}/${id}`);
  return result;
}

async function create(item) {
  let result = await JsonRequest(`${baseUrl}`, 'Post', item, true);
  return result;
}

async function update(item, id) {
  let result = await JsonRequest(`${baseUrl}/${id}`, 'Put', item, true);
  return result;
}

async function deleteItem(id) {
  let result = await JsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
  return result;
}

export default {
  getAll,
  get,
  create,
  update,
  deleteItem,
}

