import Http from '../utils/Http';

export function fetchAllIntervals(params) {
  return new Promise((resolve, reject) => {
    Http.get('intervals', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function fetchInterval(id) {
  return new Promise((resolve, reject) => {
    Http.get(`intervals/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

