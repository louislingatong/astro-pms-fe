import Http from '../utils/Http';

export function fetchAllVesselSubCategories(params) {
  return new Promise((resolve, reject) => {
    Http.get('vessel-machinery-sub-categories', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function fetchVesselSubCategory(id) {
  return new Promise((resolve, reject) => {
    Http.get(`vessel-machinery-sub-categories/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

