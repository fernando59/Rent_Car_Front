import { FC } from "react"
import { IVehicle } from "../../../models"

interface Props {
    vehicle: IVehicle
}
export const VehicleDetail: FC<Props> = ({ vehicle }) => {
    return (
        <>
            <h1 className="font-bold text-3xl">Vehicle Detail</h1>
            <h2 className="font-semibold text-xl">Brand</h2>
            <p>{vehicle.brandVehicle?.name}</p>

            <h2 className="font-semibold text-xl">Model</h2>
            <p>{vehicle.modelVehicle?.name}</p>
            <h2 className="font-semibold text-xl">Plate</h2>
            <p>{vehicle.plate}</p>
            <h2 className="font-semibold text-xl">Year</h2>
            <p>{vehicle.year}</p>
            <h2 className="font-semibold text-xl">Capacity</h2>
            <p>{vehicle.capacity}</p>
            <h2 className="font-semibold text-xl">Description</h2>
            <p>{vehicle.description}</p>

        </>
    )
}
