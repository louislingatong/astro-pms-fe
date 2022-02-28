import Http from '../utils/Http';

export function fetchAll(params) {
  return new Promise((resolve, reject) => {
    Http.get('vessels', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function fetchById(id) {
  return new Promise((resolve, reject) => {
    Http.get(`vessels/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

