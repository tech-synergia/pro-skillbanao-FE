import React from 'react'
import TermsAndConditions from '../components/TermsAndConditions'
import Navbar from '../components/Navbar'
import Title from '../components/Title'
import Footer from '../components/Footer'

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
