import { FC } from "react"
import { IVehicle } from "../../../models"

interface Props {
    vehicle: IVehicle
}
export const VehicleDetail: FC<Props> = ({ vehicle }) => {
    return (
        <>
            <h1 className="font-bold text-3xl">Vehicle Detail</h1>
            <h2 className="font-semibold text-2xl">Brand</h2>
            <p>{vehicle.brandVehicle?.name}</p>

            <h2 className="font-semibold text-2xl">Model</h2>
            <p>{vehicle.modelVehicle?.name}</p>
            <h2 className="font-semibold text-2xl">Plate</h2>
            <p>{vehicle.plate}</p>

        </>
    )
}
