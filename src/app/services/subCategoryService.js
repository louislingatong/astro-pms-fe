import Http from '../utils/Http';

export function fetchAllSubCategories(params) {
  return new Promise((resolve, reject) => {
    Http.get('sub-categories', {params})
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}

export function fetchSubCategory(id) {
  return new Promise((resolve, reject) => {
    Http.get(`sub-categories/${id}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
}

