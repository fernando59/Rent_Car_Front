import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Sidebar } from 'primereact/sidebar'
import { useState } from "react"
import { useModal } from "../../../../hooks/useModal"
import { Order } from "../../../../models/Order"
import { useGetOrdersQuery } from "../../../../store/apis"
import { FormChangeStateOrder } from "../FormChangeStateOrder"
import { endDateBodyTemplate, startDateBodyTemplate, statusBodyTemplate } from "./HelpersTableBody"
export const TableOrder = () => {
    //RTK Query
    const { data } = useGetOrdersQuery()
    const [order, setOrder] = useState<Order>({
        days: 0,
        price: 0,
        status: 0,
        VehicleId: 0,
        id: 0,
        endDate:undefined,
        startDate:undefined
    })
    // const [createModel] = useCreateModelMutation()
    // const [updateModel] = useUpdateModelMutation()
    // const [deleteModel] = useDeleteModelMutation()
    const {
        closeModalState: closeSideBar,
        modalState: sidebarState,
        openModalState: openSidebar
    } = useModal()


    const openSidebarUI = (data: any) => {
        console.log(data)
        setOrder(data)
        openSidebar()

    }
    const actionBodyAdminTemplate = (rowData: any) => {
        return (
            <div className='flex justify-end pr-10 gap-2'>
                {/* <SplitButton label="Show" icon="pi pi-eye" onClick={() => openSideBar(rowData)} model={itemsButton}></SplitButton> */}
                <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary mr-2" onClick={() => openSidebarUI(rowData)} />
            </div>
        );
    }
    return (
        <>
            <div className='py-5'>
                {/* <Button className='p-button-success' icon='pi pi-plus' onClick={openModelCreate} /> */}
            </div>
            <DataTable value={data}
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
                <Column field="startDate" header="Start Date" body={startDateBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="endDate" header="End Date" body={endDateBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="days" header="Days" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="user.email" header="User" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="vehicle.plate" header="Vehicle" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="state" header="State" className='capitalize' body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column body={actionBodyAdminTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
            </DataTable>
            <Sidebar style={{ width: '40%' }} visible={sidebarState} position="right" onHide={() => closeSideBar()}>
                <h1 className="capitalize font-bold text-3xl">Order N° {order?.id}</h1>
                <FormChangeStateOrder status={order.status} />

                <h1 className="text-center font-bold text-3xl py-10">Order Detail</h1>
                <div className="flex justify-around">
                    <div className="flex flex-col items-start">
                        <h2 className="text-gray-500">Start Date</h2>
                        <h2 className="font-bold">{new Date(order.startDate!).toLocaleDateString('en-Us')}</h2>
                    </div>
                    <div  className="flex flex-col items-start">
                        <h2 className="text-gray-500">End Date</h2>
                        <h2 className="font-bold">{new Date(order.endDate!).toLocaleDateString('en-Us')}</h2>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col items-start" >
                        <h2 className="text-gray-500">Days</h2>
                        <h2 className="font-bold">{order.days}</h2>
                    </div>
                    <div  className="flex flex-col items-start" >
                        <h2 className="text-gray-500">Price</h2>
                        <h2 className="font-bold">{order.price} $</h2>
                    </div>
                </div>

                <h1 className="text-center font-bold text-3xl py-10">Vehicle</h1>
                <div className="flex justify-around">

                    <div >
                        <h2 className="text-gray-500">Brand </h2>
                        <h2 className="font-bold">{order.vehicle?.brandVehicle?.name}</h2>
                    </div>
                    <div >
                        <h2 className="text-gray-500">Model</h2>
                        <h2 className="font-bold">{order.vehicle?.modelVehicle?.name}</h2>
                    </div>
                </div>
            </Sidebar>


        </>
    )
}
