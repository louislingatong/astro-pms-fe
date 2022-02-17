import Http from '../utils/Http';

export function fetchAllVesselMachinery(params) {
  return new Promise((resolve, reject) => {
    Http.get('vessel-machineries', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function fetchVesselMachinery(id) {
  return new Promise((resolve, reject) => {
    Http.get(`vessel-machineries/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

