import React from 'react'
import Header from '../components/layout/TopNav'
import Footer from '../components/ui/Footer'
import NewsDetail from '../components/news/NewsDetail'

const NewsDetailPage: React.FC = () => {
  return (
    <>
      <Header />
      <NewsDetail />
      <Footer />
    </>
  )
}

export default NewsDetailPage
