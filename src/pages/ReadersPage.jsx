import React, {useState} from 'react'
import {Table, Button, Space, Modal, Form, Input, message} from 'antd'
import {PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {useReaders} from '../hooks/useReaders'

const ReadersPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingReader, setEditingReader] = useState(null)
  const [form] = Form.useForm()

  const {readers, isLoading, createReader, updateReader, deleteReader} = useReaders()

  const handleAdd = () => {
    setEditingReader(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEdit = (reader) => {
    setEditingReader(reader)
    form.setFieldsValue(reader)
    setIsModalVisible(true)
  }

  const handleDelete = (reader) => {
    Modal.confirm({
      title: 'Удалить читателя?',
      content: `Вы уверены, что хотите удалить читателя "${reader.name}"?`,
      onOk: () => deleteReader(reader.id),
    })
  }

  const handleSubmit = async (values) => {
    try {
      if (editingReader) {
        await updateReader({id: editingReader.id, data: values})
      } else {
        await createReader(values)
      }
      setIsModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Ошибка при сохранении читателя')
    }
  }

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Количество выдач',
      dataIndex: 'loans',
      key: 'loans',
      render: (loans) => loans?.length || 0,
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
          <h2>Управление читателями</h2>
          <Button type="primary" icon={<PlusOutlined/>} onClick={handleAdd}>
            Добавить читателя
          </Button>
        </div>

        <Table
            columns={columns}
            dataSource={readers}
            loading={isLoading}
            rowKey="id"
        />

        <Modal
            title={editingReader ? 'Редактировать читателя' : 'Добавить читателя'}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => form.submit()}
            okText={editingReader ? 'Обновить' : 'Создать'}
            cancelText="Отмена"
        >
          <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
          >
            <Form.Item
                name="name"
                label="Имя"
                rules={[{required: true, message: 'Введите имя читателя'}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                  {required: true, message: 'Введите email'},
                  {type: 'email', message: 'Введите корректный email'}
                ]}
            >
              <Input/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}

export default ReadersPage