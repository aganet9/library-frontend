import React from 'react'
import {Row, Col, Card, Statistic, List, Typography} from 'antd'
import {BookOutlined, UserOutlined, SwapOutlined, TagsOutlined} from '@ant-design/icons'
import {useBooks} from '../hooks/useBooks'
import {useReaders} from '../hooks/useReaders'
import {useLoans} from '../hooks/useLoans'
import {useGenres} from '../hooks/useGenres'

const {Title} = Typography

const Dashboard = () => {
  const {books, isLoading: booksLoading} = useBooks()
  const {readers, isLoading: readersLoading} = useReaders()
  const {loans, isLoading: loansLoading} = useLoans()
  const {genres, isLoading: genresLoading} = useGenres()

  const activeLoans = loans.filter(loan => !loan.returnDate)
  const availableBooks = books.filter(book => book.available)

  const recentBooks = books.slice(-5).reverse()
  const recentLoans = loans.slice(-5).reverse()

  return (
      <div>
        <Title level={2}>Дашборд</Title>

        <Row gutter={16} style={{marginBottom: 24}}>
          <Col span={6}>
            <Card>
              <Statistic
                  title="Всего книг"
                  value={books.length}
                  prefix={<BookOutlined/>}
                  loading={booksLoading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                  title="Доступные книги"
                  value={availableBooks.length}
                  prefix={<BookOutlined/>}
                  loading={booksLoading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                  title="Читатели"
                  value={readers.length}
                  prefix={<UserOutlined/>}
                  loading={readersLoading}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                  title="Активные выдачи"
                  value={activeLoans.length}
                  prefix={<SwapOutlined/>}
                  loading={loansLoading}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Card title="Последние книги" loading={booksLoading}>
              <List
                  dataSource={recentBooks}
                  renderItem={book => (
                      <List.Item>
                        <List.Item.Meta
                            title={book.title}
                            description={`${book.author} • ${book.year} • ${book.available ? 'Доступна' : 'Выдана'}`}
                        />
                      </List.Item>
                  )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Последние выдачи" loading={loansLoading}>
              <List
                  dataSource={recentLoans}
                  renderItem={loan => (
                      <List.Item>
                        <List.Item.Meta
                            title={loan.bookTitle}
                            description={`Читатель: ${loan.readerName} • ${loan.loanDate} ${loan.returnDate ? `• Возврат: ${loan.returnDate}` : '(Не возвращена)'}`}
                        />
                      </List.Item>
                  )}
              />
            </Card>
          </Col>
        </Row>
      </div>
  )
}

export default Dashboard