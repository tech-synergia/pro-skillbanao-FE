import Navbar from './Navbar'
import Footer from './Footer'
import Title from './Title'
import JobUpdate from './JobUpdate'
import EBooks from './EBooks'

function Career() {
   
  return (
    <>
      <Navbar/>
      <Title pageTitle={"Careers"}/>
      <EBooks/>
      <JobUpdate/>
      <Footer/>
    </>
  )
}

export default Career
