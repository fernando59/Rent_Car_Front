import { TableVehicles } from "../components/Vehicles/TableVehicles"
export const VehiclePage = () => {
    return (
        <>

            <div className="bg-white shadow-sm rounded-t-md p-5 min-h-fit">
            <h1 className="text-center text-4xl font-bold pb-10">List of Vehicles</h1>
                <TableVehicles />
        
            </div>
        </>
    )
}
