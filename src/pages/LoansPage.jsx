import React, {useState} from 'react'
import {Table, Button, Space, Modal, Form, Select, DatePicker, Tag, message} from 'antd'
import {PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined} from '@ant-design/icons'
import {useLoans} from '../hooks/useLoans'
import {useBooks} from '../hooks/useBooks'
import {useReaders} from '../hooks/useReaders'
import dayjs from 'dayjs'

const {Option} = Select

const LoansPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingLoan, setEditingLoan] = useState(null)
  const [form] = Form.useForm()

  const {loans, isLoading, createLoan, updateLoan, deleteLoan, returnBook} = useLoans()
  const {books} = useBooks()
  const {readers} = useReaders()

  const availableBooks = books.filter(book => book.available)

  const handleAdd = () => {
    setEditingLoan(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (loan) => {
    setEditingLoan(loan)
    form.setFieldsValue({
      ...loan,
      bookId: loan.bookId,
      readerId: loan.readerId,
      loanDate: loan.loanDate ? dayjs(loan.loanDate) : null,
      returnDate: loan.returnDate ? dayjs(loan.returnDate) : null,
    })
    setIsModalVisible(true)
  }

  const handleDelete = (loan) => {
    Modal.confirm({
      title: 'Удалить выдачу?',
      content: `Вы уверены, что хотите удалить выдачу книги?`,
      onOk: () => deleteLoan(loan.id),
    })
  }

  const handleReturn = (loan) => {
    Modal.confirm({
      title: 'Вернуть книгу?',
      content: `Подтвердите возврат книги "${loan.bookTitle}"`,
      onOk: () => returnBook(loan.id),
    })
  }

  const handleSubmit = async (values) => {
    try {
      const loanData = {
        ...values,
        loanDate: values.loanDate ? values.loanDate.format('YYYY-MM-DD') : undefined,
        returnDate: values.returnDate ? values.returnDate.format('YYYY-MM-DD') : undefined,
      }

      if (editingLoan) {
        await updateLoan({id: editingLoan.id, data: loanData})
      } else {
        await createLoan(loanData)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Ошибка при сохранении выдачи')
    }
  }

  const columns = [
    {
      title: 'Книга',
      dataIndex: 'bookTitle',
      key: 'bookTitle',
    },
    {
      title: 'Читатель',
      dataIndex: 'readerName',
      key: 'readerName',
    },
    {
      title: 'Дата выдачи',
      dataIndex: 'loanDate',
      key: 'loanDate',
      render: (date) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Дата возврата',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (date) => date ? dayjs(date).format('DD.MM.YYYY') : <Tag color="orange">Не возвращена</Tag>,
    },
    {
      title: 'Статус',
      key: 'status',
      render: (_, record) => (
          <Tag color={record.returnDate ? 'green' : 'blue'}>
            {record.returnDate ? 'Возвращена' : 'На руках'}
          </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
          <Space size="middle">
            {!record.returnDate && (
                <Button
                    type="link"
                    icon={<CheckOutlined/>}
                    onClick={() => handleReturn(record)}
                >
                  Вернуть
                </Button>
            )}
            <Button
                type="link"
                icon={<EditOutlined/>}
                onClick={() => handleEdit(record)}
            >
              Редактировать
            </Button>
            <Button
                type="link"
                danger
                icon={<DeleteOutlined/>}
                onClick={() => handleDelete(record)}
            >
              Удалить
            </Button>
          </Space>
      ),
    },
  ]

  return (
      <div>
        <div style={{marginBottom: 16, display: 'flex', justifyContent: 'space-between'}}>
          <h2>Управление выдачами книг</h2>
          <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
            Новая выдача
          </Button>
        </div>

        <Table
            columns={columns}
            dataSource={loans}
            loading={isLoading}
            rowKey="id"
        />

        <Modal
            title={editingLoan ? 'Редактировать выдачу' : 'Новая выдача книги'}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => form.submit()}
            okText={editingLoan ? 'Обновить' : 'Создать'}
            cancelText="Отмена"
            width={600}
        >
          <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
          >
            <Form.Item
                name="bookId"
                label="Книга"
                rules={[{required: true, message: 'Выберите книгу'}]}
            >
              <Select placeholder="Выберите книгу">
                {availableBooks.map(book => (
                    <Option key={book.id} value={book.id}>
                      {book.title} ({book.author})
                    </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
                name="readerId"
                label="Читатель"
                rules={[{required: true, message: 'Выберите читателя'}]}
            >
              <Select placeholder="Выберите читателя">
                {readers.map(reader => (
                    <Option key={reader.id} value={reader.id}>
                      {reader.name} ({reader.email})
                    </Option>
                ))}
              </Select>
            </Form.Item>

            {editingLoan && (
                <>
                  <Form.Item
                      name="loanDate"
                      label="Дата выдачи"
                  >
                    <DatePicker style={{width: '100%'}}/>
                  </Form.Item>

                  <Form.Item
                      name="returnDate"
                      label="Дата возврата"
                  >
                    <DatePicker style={{width: '100%'}}/>
                  </Form.Item>
                </>
            )}
          </Form>
        </Modal>
      </div>
  )
}

export default LoansPage