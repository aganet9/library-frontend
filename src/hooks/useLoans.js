import {useQuery, useMutation, useQueryClient} from 'react-query'
import {loanService} from '../services/loanService'
import {message} from 'antd'

export const useLoans = () => {
  const queryClient = useQueryClient()

  const {data: loans = [], isLoading, error} = useQuery('loans', loanService.getAll)

  const createLoanMutation = useMutation(loanService.create, {
    onSuccess: () => {
      message.success('Выдача книги успешно создана')
      queryClient.invalidateQueries('loans')
      queryClient.invalidateQueries('books')
    },
    onError: () => {
      message.error('Ошибка при создании выдачи книги')
    }
  })

  const updateLoanMutation = useMutation(({id, data}) => loanService.update(id, data), {
    onSuccess: () => {
      message.success('Выдача книги успешно обновлена')
      queryClient.invalidateQueries('loans')
      queryClient.invalidateQueries('books')
    },
    onError: () => {
      message.error('Ошибка при обновлении выдачи книги')
    }
  })

  const deleteLoanMutation = useMutation(loanService.delete, {
    onSuccess: () => {
      message.success('Выдача книги успешно удалена')
      queryClient.invalidateQueries('loans')
      queryClient.invalidateQueries('books')
    },
    onError: () => {
      message.error('Ошибка при удалении выдачи книги')
    }
  })

  const returnBookMutation = useMutation(loanService.returnBook, {
    onSuccess: () => {
      message.success('Книга успешно возвращена')
      queryClient.invalidateQueries('loans')
      queryClient.invalidateQueries('books')
    },
    onError: () => {
      message.error('Ошибка при возврате книги')
    }
  })

  return {
    loans,
    isLoading,
    error,
    createLoan: createLoanMutation.mutate,
    updateLoan: updateLoanMutation.mutate,
    deleteLoan: deleteLoanMutation.mutate,
    returnBook: returnBookMutation.mutate,
    isCreating: createLoanMutation.isLoading,
    isUpdating: updateLoanMutation.isLoading,
    isDeleting: deleteLoanMutation.isLoading,
    isReturning: returnBookMutation.isLoading,
  }
}