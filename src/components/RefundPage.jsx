import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Title from './Title'
import RefundContent from './RefundContent'

function RefundPage() {
  return (
    <>
        <Navbar/>
        <Title pageTitle={"Refund & Cancellation Policy"}/>
        <RefundContent/>
        <Footer/>
    </>
  )
}

export default RefundPage
