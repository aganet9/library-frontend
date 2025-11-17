import React from 'react'
import {Layout, Typography} from 'antd'

const {Header} = Layout
const {Title} = Typography

const AppHeader = () => {
  return (
      <Header style={{background: '#001529', padding: '0 24px'}}>
        <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
          <Title level={3} style={{color: 'white', margin: 0}}>
            Библиотечная система
          </Title>
        </div>
      </Header>
  )
}

export default AppHeader