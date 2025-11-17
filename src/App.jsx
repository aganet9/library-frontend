import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Layout} from 'antd'
import AppHeader from './components/layout/AppHeader.jsx'
import AppSider from './components/layout/AppSider.jsx'
import Dashboard from './pages/Dashboard'
import BooksPage from './pages/BooksPage'
import ReadersPage from './pages/ReadersPage'
import LoansPage from './pages/LoansPage'
import GenresPage from './pages/GenresPage'
import './App.css'

const {Content} = Layout

function App() {
  return (
      <Layout style={{minHeight: '100vh'}}>
        <AppHeader/>
        <Layout>
          <AppSider/>
          <Layout>
            <Content style={{padding: '24px', background: '#fff'}}>
              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/books" element={<BooksPage/>}/>
                <Route path="/readers" element={<ReadersPage/>}/>
                <Route path="/loans" element={<LoansPage/>}/>
                <Route path="/genres" element={<GenresPage/>}/>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
  )
}

export default App