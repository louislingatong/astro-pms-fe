import Http from '../utils/Http';

export function fetchAllMachinery(params) {
  return new Promise((resolve, reject) => {
    Http.get('machineries', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function fetchMachinery(id) {
  return new Promise((resolve, reject) => {
    Http.get(`machineries/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

