import {useQuery, useMutation, useQueryClient} from 'react-query'
import {bookService} from '../services/bookService'
import {message} from 'antd'

export const useBooks = () => {
  const queryClient = useQueryClient()

  const {data: books = [], isLoading, error} = useQuery('books', bookService.getAll)

  const createBookMutation = useMutation(bookService.create, {
    onSuccess: () => {
      message.success('Книга успешно создана')
      queryClient.invalidateQueries('books')
    },
    onError: () => {
      message.error('Ошибка при создании книги')
    }
  })

  const updateBookMutation = useMutation(({id, data}) => bookService.update(id, data), {
    onSuccess: () => {
      message.success('Книга успешно обновлена')
      queryClient.invalidateQueries('books')
    },
    onError: () => {
      message.error('Ошибка при обновлении книги')
    }
  })

  const deleteBookMutation = useMutation(bookService.delete, {
    onSuccess: () => {
      message.success('Книга успешно удалена')
      queryClient.invalidateQueries('books')
    },
    onError: () => {
      message.error('Ошибка при удалении книги')
    }
  })

  return {
    books,
    isLoading,
    error,
    createBook: createBookMutation.mutate,
    updateBook: updateBookMutation.mutate,
    deleteBook: deleteBookMutation.mutate,
    isCreating: createBookMutation.isLoading,
    isUpdating: updateBookMutation.isLoading,
    isDeleting: deleteBookMutation.isLoading,
  }
}