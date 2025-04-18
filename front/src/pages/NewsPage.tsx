import React from 'react'
import Header from '../components/layout/TopNav'
import Footer from '../components/ui/Footer'
import NewsList from '../components/news/NewsList'

const NewsPage: React.FC = () => {
  return (
    <>
      <Header />
      <NewsList />
      <Footer />
    </>
  )
}

export default NewsPage
