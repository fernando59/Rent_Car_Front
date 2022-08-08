import { TableClient } from "../components/Clients/TableClient/TableClient"

export const ClientsPage = () => {
  return (
    <>
        <div className="bg-white shadow-sm rounded-t-md p-5 min-h-fit">

<h1 className="text-center text-4xl font-bold pb-10">List of Clients</h1>
      <TableClient/>
    </div>
    </>
  )
}
