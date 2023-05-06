export const API_HOST = 'http://127.0.0.1:8000';

export const endpoints = {
  login: '/api/token/',
  signup: '/api/register/',
	todo: '/api/todo/',
  token: '/api/token/refresh/',
  logout: '/api/auth/logout',
  user: '/api/users/me',
};

export async function fetchWrapper(endpoint: string, opts: {
  method: string;
  headers?: { [key: string]: string };
  mode?: string;
  body?: { [key: string]: any } | string;
}) {
  opts.headers = {
    'Content-Type': 'application/json',
    ...opts.headers,
  };
  opts.mode = 'cors';
  if (opts.body) {
    opts.body = JSON.stringify(opts.body);
  }
  return fetch(`${API_HOST}${endpoint}`, opts as RequestInit);
}