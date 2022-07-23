import { AboutUs } from "../components/AboutUs"
import { Banner } from "../components/Banner"
import { Navbar } from "../components/Navbar"
import { Reservation } from "../components/Reservation"

export const WelcomePage = () => {
  return (
    <>
          <Navbar />
      <Banner />
      <Reservation />
      <AboutUs />

    </>
  )
}
