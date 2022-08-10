import { useGetOrdersByDayQuery, useGetUsersQuery, useGetVehiclesCountQuery } from "../../store/apis"
import { CardDashboard } from "../components/CardDashboard"
import { ChartPie } from "../components/ChartPie"

export const DashBoardPage = () => {
  const { data: ordersCount = 0 } = useGetOrdersByDayQuery()
  const { data: vehiclesCount = 0 } = useGetVehiclesCountQuery()
  const { data: users = [] } = useGetUsersQuery()
  return (
    <>

      {/* <h1 className="text-center font-bold text-4xl pb-10">Dashboard</h1> */}
      <div className="grid grid-cols-4 gap-10 pb-10">


        <CardDashboard title="Orders" valueNumber={ordersCount} icon="pi-shopping-cart" backgroundIcon="bg-[#D0E1FD]" colorIconText="text-blue-500" />
        <CardDashboard title="Clients" valueNumber={users?.length} icon="pi-user" backgroundIcon="bg-[#FEDDC7]" colorIconText="text-orange-500" />
        <CardDashboard title="Vehicles" valueNumber={vehiclesCount} icon="pi-car" backgroundIcon="bg-[#EAD6FD]" colorIconText="text-[#A855F7]" />



      </div>
      <div className="bg-white shadow-sm rounded-lg flex justify-center flex-col items-center p-10">

        <ChartPie />
      </div>
    </>
  )
}
