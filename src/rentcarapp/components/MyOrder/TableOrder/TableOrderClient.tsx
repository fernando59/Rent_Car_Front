import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useGetOrdersByUserQuery } from "../../../../store/apis"
import { endDateBodyClientTemplate, startDateBodyClientTemplate, statusBodyClientTemplate } from "./HelpersTableBodyClient"

export const TableOrderClient = () => {
    const { data } = useGetOrdersByUserQuery()
    console.log(data)
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
        </DataTable>
    </>

}
