
import { AboutUs } from '../components/AboutUs';
import { Banner } from '../components/Banner';
import { Navbar } from '../components/Navbar';
import { Reservation } from '../components/Reservation';



function  IndexPage (){
  return (
    <>
      <Navbar />
      <Banner />
      <Reservation />
      <AboutUs />

    </>
  )
}

export default IndexPage