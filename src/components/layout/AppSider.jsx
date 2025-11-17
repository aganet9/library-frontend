import React, {useState} from 'react'
import {Layout, Menu} from 'antd'
import {useNavigate, useLocation} from 'react-router-dom'
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  SwapOutlined,
  TagsOutlined,
} from '@ant-design/icons'

const {Sider} = Layout

const AppSider = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined/>,
      label: 'Дашборд',
    },
    {
      key: '/books',
      icon: <BookOutlined/>,
      label: 'Книги',
    },
    {
      key: '/readers',
      icon: <UserOutlined/>,
      label: 'Читатели',
    },
    {
      key: '/loans',
      icon: <SwapOutlined/>,
      label: 'Выдачи книг',
    },
    {
      key: '/genres',
      icon: <TagsOutlined/>,
      label: 'Жанры',
    },
  ]

  return (
      <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{background: '#fff'}}
      >
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({key}) => navigate(key)}
            style={{height: '100%', borderRight: 0}}
        />
      </Sider>
  )
}

export default AppSider