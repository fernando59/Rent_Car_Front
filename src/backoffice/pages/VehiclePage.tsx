import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { IVehicle } from '../../models';
import { TableVehicles } from "../components/Vehicles/TableVehicles";
import { VehicleDetail } from '../components/Vehicles/VehicleDetail';
export const VehiclePage = () => {
    const [vehicle, setVehicle] = useState<IVehicle>({
        state: 1,
        brandVehicle: null,
        capacity: 0,
        hasAir: false,
        modelVehicle: null,
        plate: '',
        price: 0,
        typeVehicle: null,
        year: 2000,
        description:null


    })
    const {
        openModalState,
        closeModalState,
        modalState
    } = useModal()

    const closeSideBar = () => {
        closeModalState()
    }
    const openSideBar = (data: any) => {
        setVehicle(data)
        openModalState()
    }
    return (
        <>

            <div className="bg-white shadow-sm rounded-t-md p-5 min-h-fit">
                <h1 className="text-center text-4xl font-bold pb-10">List of Vehicles</h1>
                <TableVehicles openSideBar={openSideBar} />

            </div>
            <Sidebar visible={modalState} position="right" onHide={closeSideBar}>
                <VehicleDetail vehicle={vehicle} />
            </Sidebar>
        </>
    )
}
