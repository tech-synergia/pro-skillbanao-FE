import React from 'react'
import Navbar from './Navbar'
import Title from './Title'
import Privacy from './Privacy'
import Footer from './Footer'

function PrivacyPage() {
  return (
    <>
        <Navbar/>
        <Title pageTitle={"Privacy Policy"}/>
        <Privacy/>
        <Footer/>
    </>
  )
}

export default PrivacyPage
