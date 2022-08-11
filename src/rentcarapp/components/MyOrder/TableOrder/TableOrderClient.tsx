import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Sidebar } from "primereact/sidebar"
import { useState } from "react"
import { useModal } from "../../../../hooks/useModal"
import { Order } from "../../../../models/Order"
import { useGetOrdersByUserQuery } from "../../../../store/apis"
import { endDateBodyClientTemplate, startDateBodyClientTemplate, statusBodyClientTemplate } from "./HelpersTableBodyClient"

export const TableOrderClient = () => {
    const { data } = useGetOrdersByUserQuery()
    const [order, setOrder] = useState<Order>({
        days: 0,
        price: 0,
        status: 0,
        VehicleId: 0,
        id: 0,
        endDate: undefined,
        startDate: undefined
    })
    const {
        closeModalState: closeSideBar,
        modalState: sidebarState,
        openModalState: openSidebar
    } = useModal()

    const openSidebarUI = (data: any) => {
        setOrder(data)
        openSidebar()

    }
    const actionBodyAdminTemplate = (rowData: any) => {
        return (
            <div className='flex justify-end pr-10 gap-2'>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary mr-2" onClick={() => openSidebarUI(rowData)} />
            </div>
        );
    }
    return <>
        <DataTable
            value={data}
            responsiveLayout="scroll"
            showGridlines
            paginator
            filterDisplay="menu"
            dataKey="id"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={5}
            rowsPerPageOptions={[5, 10, 20]}
            // header={header}
            globalFilterFields={['id', 'name']}
        // filters={filters1}
        >

            <Column field="id" header="Id" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="startDate" header="Start Date" body={startDateBodyClientTemplate} sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="endDate" header="End Date" body={endDateBodyClientTemplate} sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="vehicle.plate" header="Plate" sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="days" header="Days" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
            <Column field="state" header="State" className='capitalize' body={statusBodyClientTemplate} sortable style={{ minWidth: '12rem' }}></Column>
            <Column body={actionBodyAdminTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
        <Sidebar style={{ width: '40%' }} visible={sidebarState} position="right" onHide={() => closeSideBar()}>
            <div className="mx-auto w-full lg:w-[50%] container px-10">

                <h1 className="text-center font-bold  text-2xl pb-10">Detail Order #{order?.id}</h1>

                <div className="flex justify-between">
                    <div>
                        <p className="font-bold">Start Date</p>
                        <p>{new Date(order?.startDate!).toLocaleDateString()}</p>
                    </div>

                    <div>
                        <p className="font-bold">End Date</p>
                        <p>{new Date(order?.endDate!).toLocaleDateString()}</p>
                    </div>

                </div>
                <div className="flex justify-between pt-10">
                    <div>
                        <p className="font-bold">Days</p>
                        <p>{order?.days}</p>
                    </div>

                    <div>
                        <p className="font-bold">Price</p>
                        <p>{order?.price} $</p>
                    </div>

                </div>
                <h1 className="text-center font-bold  text-2xl pb-10">Vehicle Detail</h1> 
                <div className="flex justify-between pt-10">
                    <div>
                        <p className="font-bold">Brand</p>
                        <p>{order.vehicle?.brandVehicle?.name}</p>
                    </div>

                    <div>
                        <p className="font-bold">Model</p>
                        <p>{order.vehicle?.modelVehicle?.name}</p>
                    </div>

                </div>
                <div className="flex justify-between pt-10">
                    <div>
                        <p className="font-bold">Plate</p>
                        <p>{order.vehicle?.plate}</p>
                    </div>

                    <div>
                        <p className="font-bold">Year</p>
                        <p>{order.vehicle?.year}</p>
                    </div>

                </div>
            </div>
        </Sidebar>
    </>

}
