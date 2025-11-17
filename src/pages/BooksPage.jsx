import React, {useState} from 'react'
import {Table, Button, Space, Modal, Form, Input, InputNumber, Select, Tag, message} from 'antd'
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {useBooks} from '../hooks/useBooks'
import {useGenres} from '../hooks/useGenres'

const {Option} = Select

const BooksPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [form] = Form.useForm()

  const {books, isLoading, createBook, updateBook, deleteBook} = useBooks()
  const {genres} = useGenres()

  const handleAdd = () => {
    setEditingBook(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    form.setFieldsValue({
      ...book,
      genresName: book.genresName || []
    })
    setIsModalVisible(true)
  }

  const handleDelete = (book) => {
    Modal.confirm({
      title: 'Удалить книгу?',
      content: `Вы уверены, что хотите удалить книгу "${book.title}"?`,
      onOk: () => deleteBook(book.id),
    })
  }

  const handleSubmit = async (values) => {
    try {
      if (editingBook) {
        await updateBook({id: editingBook.id, data: values})
      } else {
        await createBook(values)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Ошибка при сохранении книги')
    }
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Автор',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Год',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Статус',
      dataIndex: 'available',
      key: 'available',
      render: (available) => (
          <Tag color={available ? 'green' : 'red'}>
            {available ? 'Доступна' : 'Выдана'}
          </Tag>
      ),
    },
    {
      title: 'Жанры',
      dataIndex: 'genresName',
      key: 'genresName',
      render: (genres) => genres?.map(genre => (
          <Tag key={genre} style={{margin: 2}}>{genre}</Tag>
      )),
    },
    {
      title: 'Количество выдач',
      dataIndex: 'loansCount',
      key: 'loansCount',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_, record) => (
          <Space size="middle">
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
          <h2>Управление книгами</h2>
          <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
            Добавить книгу
          </Button>
        </div>

        <Table
            columns={columns}
            dataSource={books}
            loading={isLoading}
            rowKey="id"
        />

        <Modal
            title={editingBook ? 'Редактировать книгу' : 'Добавить книгу'}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => form.submit()}
            okText={editingBook ? 'Обновить' : 'Создать'}
            cancelText="Отмена"
        >
          <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
          >
            <Form.Item
                name="title"
                label="Название"
                rules={[{required: true, message: 'Введите название книги'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
                name="author"
                label="Автор"
                rules={[{required: true, message: 'Введите автора'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
                name="year"
                label="Год издания"
                rules={[{required: true, message: 'Введите год издания'}]}
            >
              <InputNumber min={1000} max={new Date().getFullYear()} style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                name="genresName"
                label="Жанры"
            >
              <Select mode="tags" placeholder="Выберите жанры">
                {genres.map(genre => (
                    <Option key={genre.name} value={genre.name}>
                      {genre.name}
                    </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}

export default BooksPage