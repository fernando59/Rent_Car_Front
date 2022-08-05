import { useGetOrdersByUserQuery } from "../../store/apis"
import { Navbar } from "../components/Navbar"

export const HistoryPage = () => {
  const {data} =useGetOrdersByUserQuery()
  console.log(data)
  return (
    <>

      <Navbar />
      <div className="mx-auto container">
        <h1 className='py-10 font-bold text-5xl'>History Page</h1>

      </div>
    </>
  )
}
