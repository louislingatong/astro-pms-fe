import Http from '../utils/Http';

export function fetchAllRunningHours(params) {
  return new Promise((resolve, reject) => {
    Http.get('running-hours', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}
