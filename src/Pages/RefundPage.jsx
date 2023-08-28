import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Title from '../components/Title'
import RefundContent from '../components/RefundContent'

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
