import Http from '../utils/Http';

export function fetchAllUsers(params) {
  return new Promise((resolve, reject) => {
    Http.get('users', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function fetchUser(id) {
  return new Promise((resolve, reject) => {
    Http.get(`users/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

