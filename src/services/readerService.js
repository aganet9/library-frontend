import api from './api'

export const readerService = {
  getAll: () => api.get('/readers').then(res => res.data),
  getById: (id) => api.get(`/readers/${id}`).then(res => res.data),
  create: (readerData) => api.post('/readers', readerData).then(res => res.data),
  update: (id, readerData) => api.put(`/readers/${id}`, readerData).then(res => res.data),
  delete: (id) => api.delete(`/readers/${id}`),
  changeName: (id, name) => api.patch(`/readers/${id}/name/${name}`).then(res => res.data),
}