import { TableTypeVehicle } from "../components/TypeVehicle/TableTypeVehicle/TableTypeVehicle"

export const TypeVehiclePage = () => {
  return (
    <>
      <div className="bg-white shadow-sm rounded-t-md p-5 min-h-fit">

        <h1 className="text-center text-4xl font-bold pb-10">List of Type Vehicles</h1>
        <TableTypeVehicle />
      </div>
    </>
  )
}
