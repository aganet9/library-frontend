import {useQuery, useMutation, useQueryClient} from 'react-query'
import {readerService} from '../services/readerService'
import {message} from 'antd'

export const useReaders = () => {
  const queryClient = useQueryClient()

  const {data: readers = [], isLoading, error} = useQuery('readers', readerService.getAll)

  const createReaderMutation = useMutation(readerService.create, {
    onSuccess: () => {
      message.success('Читатель успешно создан')
      queryClient.invalidateQueries('readers')
    },
    onError: () => {
      message.error('Ошибка при создании читателя')
    }
  })

  const updateReaderMutation = useMutation(({id, data}) => readerService.update(id, data), {
    onSuccess: () => {
      message.success('Читатель успешно обновлен')
      queryClient.invalidateQueries('readers')
    },
    onError: () => {
      message.error('Ошибка при обновлении читателя')
    }
  })

  const deleteReaderMutation = useMutation(readerService.delete, {
    onSuccess: () => {
      message.success('Читатель успешно удален')
      queryClient.invalidateQueries('readers')
    },
    onError: () => {
      message.error('Ошибка при удалении читателя')
    }
  })

  return {
    readers,
    isLoading,
    error,
    createReader: createReaderMutation.mutate,
    updateReader: updateReaderMutation.mutate,
    deleteReader: deleteReaderMutation.mutate,
    isCreating: createReaderMutation.isLoading,
    isUpdating: updateReaderMutation.isLoading,
    isDeleting: deleteReaderMutation.isLoading,
  }
}