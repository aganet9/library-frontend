import api from './api'

export const bookService = {
  getAll: () => api.get('/books').then(res => res.data),
  getById: (id) => api.get(`/books/${id}`).then(res => res.data),
  create: (bookData) => api.post('/books', bookData).then(res => res.data),
  update: (id, bookData) => api.put(`/books/${id}`, bookData).then(res => res.data),
  delete: (id) => api.delete(`/books/${id}`),
  addGenre: (bookId, genreName) => api.post(`/books/${bookId}/genres/${genreName}`).then(res => res.data),
  removeGenre: (bookId, genreName) => api.delete(`/books/${bookId}/genres/${genreName}`),
  changeTitle: (id, title) => api.patch(`/books/${id}/title/${title}`).then(res => res.data),
}