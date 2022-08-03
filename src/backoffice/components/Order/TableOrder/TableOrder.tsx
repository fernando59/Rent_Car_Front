import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { useGetOrdersQuery } from "../../../../store/apis"

export const TableOrder = () => {
    //RTK Query
    const { data } = useGetOrdersQuery()
    // const [createModel] = useCreateModelMutation()
    // const [updateModel] = useUpdateModelMutation()
    // const [deleteModel] = useDeleteModelMutation()
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
                <Column field="days" header="Days" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="price" header="Price" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="user.email" header="User"  sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="vehicle.plate" header="Vehicle"  sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="createAt" header="Start Date"  sortable style={{ minWidth: '12rem' }}></Column>
                {/* <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column> */}
            </DataTable>


        </>
    )
}
