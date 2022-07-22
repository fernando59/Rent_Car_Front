import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useModal } from '../../../../hooks/useModal';
import { useGetBrandsQuery } from '../../../../store/apis';


interface BrandVehicle {
    id: number
    name: string
}

const defaultBrand: BrandVehicle = {
    id: 0,
    name: ''
}
export const TableBrand = () => {
    const { data } = useGetBrandsQuery()
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [brand, setBrand] = useState<BrandVehicle>(defaultBrand)
    //ModalDelete
    const {
        openModalState: openModalStateDelete,
        closeModalState: closeModalStateDelete,
        modalState: modalDelete
    } = useModal()

    //ModalUpdate
    const {
        openModalState: openModalStateUpdate,
        closeModalState: closeModalStateUpdate,
        modalState: modalUpdate
    } = useModal()

    const [filters1, setFilters1] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });
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





    // CRUD

    const editBrand = (data: BrandVehicle) => {
        openModalStateUpdate()
        setBrand(data)
    }
    const deleteBrand = (data: BrandVehicle) => {
        openModalStateDelete()
        setBrand(data)

    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className='flex justify-end pr-10 gap-2'>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => editBrand(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteBrand(rowData)} />
            </div>
        );
    }

    const closeModalUpdate =() =>{
        closeModalStateUpdate()
        setBrand(defaultBrand)
    }
    const closeModalDelete=() =>{
        closeModalStateDelete()
        setBrand(defaultBrand)
    }


    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={closeModalUpdate} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={() => { }} />
        </>
    );
    const deleteBrandDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={closeModalDelete} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => { }} />
        </>
    );
    return (
        <>

            <div className="card">
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
                    globalFilterFields={['id', 'name']}
                    filters={filters1}
                >

                    <Column field="id" header="Id" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="Name" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>

                <Dialog
                    visible={modalDelete}
                    style={{ width: '450px' }}
                    header="Confirm" modal
                    footer={deleteBrandDialogFooter}
                    onHide={() => closeModalStateDelete()}
                >
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {brand.id != 0 && <span>Are you sure you want to delete <b className='capitalize'>{brand.name}</b>?</span>}
                    </div>
                </Dialog>

                {/* UPDATE */}
                <Dialog visible={modalUpdate} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={closeModalUpdate}>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    {/* <InputText id="name" value={brand.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} /> */}
                    <InputText/>
                    {/* {submitted && !product.name && <small className="p-error">Name is required.</small>} */}
                </div>
             


         
            </Dialog>




            </div>
        </>
    )
}
