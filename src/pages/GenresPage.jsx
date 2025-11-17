import React, {useState} from 'react'
import {Table, Button, Space, Modal, Form, Input, message} from 'antd'
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {useGenres} from '../hooks/useGenres'

const GenresPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingGenre, setEditingGenre] = useState(null)
  const [form] = Form.useForm()

  const {genres, isLoading, createGenre, updateGenre, deleteGenre} = useGenres()

  const handleAdd = () => {
    setEditingGenre(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (genre) => {
    setEditingGenre(genre)
    form.setFieldsValue(genre)
    setIsModalVisible(true)
  }

  const handleDelete = (genre) => {
    Modal.confirm({
      title: 'Удалить жанр?',
      content: `Вы уверены, что хотите удалить жанр "${genre.name}"?`,
      onOk: () => deleteGenre(genre.id),
    })
  }

  const handleSubmit = async (values) => {
    try {
      if (editingGenre) {
        await updateGenre({id: editingGenre.id, data: values})
      } else {
        await createGenre(values)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Ошибка при сохранении жанра')
    }
  }

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Количество книг',
      dataIndex: 'bookIds',
      key: 'bookIds',
      render: (bookIds) => bookIds?.length || 0,
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
          <h2>Управление жанрами</h2>
          <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
            Добавить жанр
          </Button>
        </div>

        <Table
            columns={columns}
            dataSource={genres}
            loading={isLoading}
            rowKey="id"
        />

        <Modal
            title={editingGenre ? 'Редактировать жанр' : 'Добавить жанр'}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => form.submit()}
            okText={editingGenre ? 'Обновить' : 'Создать'}
            cancelText="Отмена"
        >
          <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
          >
            <Form.Item
                name="name"
                label="Название жанра"
                rules={[{required: true, message: 'Введите название жанра'}]}
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}

export default GenresPage