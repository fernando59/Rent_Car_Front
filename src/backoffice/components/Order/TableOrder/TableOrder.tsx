import { FilterMatchMode, FilterOperator } from "primereact/api"
import { Button } from "primereact/button"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Sidebar } from 'primereact/sidebar'
import { Toast } from "primereact/toast"
import { useRef, useState } from "react"
import { useModal } from "../../../../hooks/useModal"
import { Order } from "../../../../models/Order"
import { useCreateOrderAdminMutation, useGetOrdersQuery } from "../../../../store/apis"
import { FormChangeStateOrder } from "../FormChangeStateOrder"
import { FormCreateOrderAdmin } from "../FormCreateOrderAdmin"
import { endDateBodyTemplate, startDateBodyTemplate, statusBodyTemplate } from "./HelpersTableBody"



const defaultValues = {
    startDate: undefined,
    endDate: undefined

}
export const TableOrder = () => {
    //RTK Query
    const { data } = useGetOrdersQuery()
    const [createOrderAdmin, { isLoading }] = useCreateOrderAdminMutation()

    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<any>(null);
    const [filters1, setFilters1] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });

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
    const {
        closeModalState,
        modalState,
        openModalState
    } = useModal()

    const openSidebarUI = (data: any) => {
        setOrder(data)
        openSidebar()

    }
    const closeSuccessChangeState = () => {
        closeSideBar()
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Change status successfull', life: 3000 });
    }
    const openModalCreateOrder = () => {
        openModalState()
    }
    const closeModalCreateOrder = () => {
        closeModalState()
    }

    const onHandleSubmitCreateOrder = async (data: any) => {
        try {

            const res = await createOrderAdmin(data).unwrap()
            const { success, message } = res
            if (success) {
                closeModalCreateOrder()
                toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
            } else {
                toast.current.error({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
            }

        } catch (e) {
            toast.current.error({ severity: 'error', summary: 'Error', detail: 'Error', life: 3000 });
        }

    }

    // FILTER
    const filterTable = (e: any) => {
        const value = e.target.value
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;
        setFilters1(_filters1);
        setGlobalFilter(value)
    }
    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter} type="search" onChange={filterTable} placeholder="Search..." />
            </span>
        </div>
    );

    const actionBodyAdminTemplate = (rowData: any) => {
        return (
            <div className='flex justify-end pr-10 gap-2'>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary mr-2" onClick={() => openSidebarUI(rowData)} />
            </div>
        );
    }



    return (
        <>
            <div className='py-5'>
                <Button className='p-button-success' icon='pi pi-plus' onClick={openModalCreateOrder} />
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
                header={header}
                globalFilterFields={['id', 'startDate', 'days', 'endDate', 'vehicle.plate', 'user.email']}
                filters={filters1}
            >

                <Column field="id" header="Id" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="startDate" header="Start Date" body={startDateBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="endDate" header="End Date" body={endDateBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="days" header="Days" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="user.email" header="User" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="vehicle.plate" header="Vehicle" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="state" header="State" className='capitalize' body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column body={actionBodyAdminTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
            {/* SIDEBAR */}
            <Sidebar style={{ width: '40%' }} visible={sidebarState} position="right" onHide={() => closeSideBar()}>
                <h1 className="capitalize font-bold text-3xl">Order N° {order?.id}</h1>
                <FormChangeStateOrder status={order.status} idOrder={order.id} closeSideBar={closeSuccessChangeState} />

                <h1 className="text-center font-bold text-3xl py-10">Order Detail</h1>
                <div className="flex justify-around">
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-gray-500">Start Date</h2>
                        <h2 className="font-bold">{new Date(order.startDate!).toLocaleDateString('en-Us')}</h2>
                    </div>
                    <div className="flex flex-col items-start">
                        <h2 className="text-gray-500">End Date</h2>
                        <h2 className="font-bold">{new Date(order.endDate!).toLocaleDateString('en-Us')}</h2>
                    </div>
                </div>
                <div className="flex justify-around">
                    <div className="flex flex-col items-start justify-center" >
                        <h2 className="text-gray-500">Days</h2>
                        <h2 className="font-bold">{order.days}</h2>
                    </div>
                    <div className="flex flex-col items-start justify-center" >
                        <h2 className="text-gray-500">Price</h2>
                        <h2 className="font-bold">{order.price} $</h2>
                    </div>
                </div>
                {/* <div className="flex justify-around items-center">
                    <div className="flex flex-col items-start" >
                        <h2 className="text-gray-500 text-left flex-1">Total</h2>
                        <h2 className="font-bold flex-1">{order.days*order.price} $</h2>
                    </div>
                    <div className="flex flex-col items-start" >
                        <h2 className="text-gray-500"></h2>
                        <h2 className="font-bold"></h2>
                    </div>
                </div> */}

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

            {/* MODAL */}
            <Dialog visible={modalState} modal onHide={closeModalCreateOrder} header={'Create Order'} style={{ width: '450px' }}>
                <FormCreateOrderAdmin
                    closeModalOrder={closeModalCreateOrder}
                    onHandleSubmitCreateOrder={onHandleSubmitCreateOrder}
                    defaultValues={defaultValues}
                />
            </Dialog>
            <Toast ref={toast} />

        </>
    )
}
