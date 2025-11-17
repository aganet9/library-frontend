import {useQuery, useMutation, useQueryClient} from 'react-query'
import {genreService} from '../services/genreService'
import {message} from 'antd'

export const useGenres = () => {
  const queryClient = useQueryClient()

  const {data: genres = [], isLoading, error} = useQuery('genres', genreService.getAll)

  const createGenreMutation = useMutation(genreService.create, {
    onSuccess: () => {
      message.success('Жанр успешно создан')
      queryClient.invalidateQueries('genres')
    },
    onError: () => {
      message.error('Ошибка при создании жанра')
    }
  })

  const updateGenreMutation = useMutation(({id, data}) => genreService.update(id, data), {
    onSuccess: () => {
      message.success('Жанр успешно обновлен')
      queryClient.invalidateQueries('genres')
    },
    onError: () => {
      message.error('Ошибка при обновлении жанра')
    }
  })

  const deleteGenreMutation = useMutation(genreService.delete, {
    onSuccess: () => {
      message.success('Жанр успешно удален')
      queryClient.invalidateQueries('genres')
    },
    onError: () => {
      message.error('Ошибка при удалении жанра')
    }
  })

  return {
    genres,
    isLoading,
    error,
    createGenre: createGenreMutation.mutate,
    updateGenre: updateGenreMutation.mutate,
    deleteGenre: deleteGenreMutation.mutate,
    isCreating: createGenreMutation.isLoading,
    isUpdating: updateGenreMutation.isLoading,
    isDeleting: deleteGenreMutation.isLoading,
  }
}