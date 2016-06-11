export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';

export function logout () {
  window.localStorage.removeItem('id_token');
  window.localStorage.removeItem('user');
  window.localStorage.removeItem('username');
  window.localStorage.setItem('isAuthenticated', false);
  return {
    type:LOG_OUT_SUCCESS
  };
}