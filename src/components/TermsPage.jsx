import React from 'react'
import TermsAndConditions from './TermsAndConditions'
import Navbar from './Navbar'
import Title from './Title'
import Footer from './Footer'

function TermsPage() {
  return (
    <div>
        <Navbar/>
        <Title pageTitle={"Terms and Conditions of Usage"}/>
        <TermsAndConditions/>
        <Footer/>
    </div>
  )
}

export default TermsPage
