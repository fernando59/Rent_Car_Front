import { TableBrand } from "../components/BrandVehicle/TableBrand/TableBrand"

export const BrandPage = () => {
  return (
    <>
    
    <div className="bg-white shadow-sm rounded-t-md p-5 min-h-fit">

      <h1 className="text-center text-4xl font-bold pb-10">List of Brands</h1>
      <TableBrand/>
    </div>
    </>
  )
}
