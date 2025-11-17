import api from './api'

export const genreService = {
  getAll: () => api.get('/genres').then(res => res.data),
  getById: (id) => api.get(`/genres/${id}`).then(res => res.data),
  create: (genreData) => api.post('/genres', genreData).then(res => res.data),
  update: (id, genreData) => api.put(`/genres/${id}`, genreData).then(res => res.data),
  delete: (id) => api.delete(`/genres/${id}`),
  patchName: (id, name) => api.patch(`/genres/${id}/name/${name}`).then(res => res.data),
}