import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Title from '../components/Title'
import JobUpdate from '../components/JobUpdate'
import EBooks from '../components/EBooks'
import Sessions from '../components/Sessions'

function Career() {
   
  return (
    <>
      <Navbar/>
      <Title pageTitle={"Careers"}/>
      <EBooks/>
      <Sessions/>
      <JobUpdate/>
      <Footer/>
    </>
  )
}

export default Career
