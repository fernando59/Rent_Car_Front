import { TableModel } from "../components/ModelVehicle/TableModel/TableModel"

export const ModelPage = () => {
  return (
    <>

      <div className="bg-white shadow-sm rounded-t-md p-5 min-h-fit">

        <h1 className="text-center text-4xl font-bold pb-10">List of Models</h1>
        <TableModel />
      </div>
    </>
  )
}
