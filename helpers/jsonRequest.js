import authService from "../services/authService";

export async function JsonRequest(url, method, body, isAuthorised, skipResult) {

  if (method === undefined) {
    method = 'Get';
  }

  let headers = {};

  if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
    headers['content-type'] = 'application/json'
  }

  if (isAuthorised) {
    headers['X-Authorization'] = authService.getUser().accessToken;
  }

  let options = {
    headers,
    method
  }

  if (body !== undefined) {
    options.body = JSON.stringify(body)
  }

  let response = await fetch(url, options)

  if (!response.ok) {
    let message = await response.text();
    throw new Error(`${response.status}: ${response.statusText}\n${message}`)
  }

  let result = undefined;
  if (!skipResult) {
      response = await response.json();
  }

  return result
}

