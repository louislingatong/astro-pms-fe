import Http from '../utils/Http';

export function fetchAllWorks(params) {
  return new Promise((resolve, reject) => {
    Http.get('works', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}
