import React from 'react'
import Header from '../components/layout/TopNav'
import Footer from '../components/ui/Footer'
import CustomerList from '../components/customer/CustomerList'

const CustomerPage: React.FC = () => {
  return (
    <>
      <Header />
      <CustomerList />
      <Footer />
    </>
  )
}

export default CustomerPage
