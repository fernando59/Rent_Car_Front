import { TableOrderClient } from "../components/MyOrder/TableOrder/TableOrderClient"
import { Navbar } from "../components/Navbar"

export const HistoryPage = () => {

  return (
    <>

      <Navbar />
      <div className="mx-auto container">
        <h1 className='py-10 font-bold text-5xl'>My Orders</h1>
        <TableOrderClient/>

      </div>
    </>
  )
}
