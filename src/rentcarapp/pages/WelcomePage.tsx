import { ScrollTop } from 'primereact/scrolltop';
import { AboutUs } from "../components/AboutUs";
import { Banner } from "../components/Banner";
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { Navbar } from "../components/Navbar";
import { Reservation } from "../components/Reservation";
export const WelcomePage = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Reservation />
      <AboutUs />
      <ScrollTop icon="pi pi-arrow-up" threshold={100} className="custom-scrolltop" />

      <Contact />
      <Footer />
    </>
  )
}
