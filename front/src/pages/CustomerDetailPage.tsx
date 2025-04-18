import React from 'react'
import Header from '../components/layout/TopNav'
import Footer from '../components/ui/Footer'
import CustomerDetail from '../components/customer/CustomerDetail'

const CustomerDetailPage: React.FC = () => {
  return (
    <>
      <Header />
      <CustomerDetail />
      <Footer />
    </>
  )
}

export default CustomerDetailPage
