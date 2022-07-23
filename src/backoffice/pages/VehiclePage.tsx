import { Dialog } from "primereact/dialog"
import { FormVehicles } from "../components/Vehicles/FormVehicles"
export const VehiclePage = () => {
    return (
        <>

            vehicle page
            <Dialog visible={true} onHide={() => { }}>
                <FormVehicles/>
            </Dialog>
        </>
    )
}
