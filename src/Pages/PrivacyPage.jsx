import React from 'react'
import Navbar from '../components/Navbar'
import Title from '../components/Title'
import Privacy from '../components/Privacy'
import Footer from '../components/Footer'

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
