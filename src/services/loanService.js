import api from './api'

export const loanService = {
  getAll: () => api.get('/loans').then(res => res.data),
  getById: (id) => api.get(`/loans/${id}`).then(res => res.data),
  create: (loanData) => api.post('/loans', loanData).then(res => res.data),
  update: (id, loanData) => api.put(`/loans/${id}`, loanData).then(res => res.data),
  delete: (id) => api.delete(`/loans/${id}`),
  returnBook: (id) => api.patch(`/loans/${id}/return`).then(res => res.data),
}