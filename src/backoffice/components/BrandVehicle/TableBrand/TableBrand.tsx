import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';
import { useModal } from '../../../../hooks/useModal';
import { IBrand } from '../../../../models/Brand';
import { useCreateBrandMutation, useDeleteBrandMutation, useGetBrandsQuery, useUpdateBrandMutation } from '../../../../store/apis';
import { FormBrand } from './FormBrand';




const defaultBrand: IBrand = {
    id: 0,
    name: ''
}


export const TableBrand = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [brand, setBrand] = useState<IBrand>(defaultBrand)
    const [filters1, setFilters1] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    });

    //RTK Query
    const { data } = useGetBrandsQuery()
    const [createBrand] = useCreateBrandMutation()
    const [updateBrand] = useUpdateBrandMutation()
    const [deleteBrand] = useDeleteBrandMutation()

    //UI
    //ModalDelete
    const {
        openModalState: openModalStateDelete,
        closeModalState: closeModalStateDelete,
        modalState: modalDelete
    } = useModal()

    //Modal Save
    const {
        openModalState: openModalStateSave,
        closeModalState: closeModalStateSave,
        modalState: modalUpdate
    } = useModal()

    
    const toast = useRef<any>(null);


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

    const openModalEdit = (data: IBrand) => {
        openModalStateSave()
        setBrand(data)
    }
    const opendeleteBrandModal = (data: IBrand) => {
        openModalStateDelete()
        setBrand(data)

    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className='flex justify-end pr-10 gap-2'>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => openModalEdit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => opendeleteBrandModal(rowData)} />
            </div>
        );
    }

    const closeModalUpdate = () => {
        closeModalStateSave()
        setBrand(defaultBrand)
    }
    const closeModalDelete = () => {
        closeModalStateDelete()
        setBrand(defaultBrand)
    }

    const deleteBrandExecute = async () => {
        const res = await deleteBrand(brand.id).unwrap()
        const { success, message } = res
        if (success) {
            closeModalDelete()
            toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
        }
    }


    const deleteBrandDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={closeModalDelete} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteBrandExecute} />
        </>
    );



    const onHandleSubmitSaveBrand = async (data: any) => {
        try {

            let res
            if (brand.id == 0)
                res = await createBrand(data).unwrap()
            else {
                data.id = brand.id
                res = await updateBrand(data).unwrap()
            }
            const { success, message } = res
            if (success) {
                closeModalStateSave()
                toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
            }


        } catch (e) {

            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error', life: 3000 });
        }

    }
    const openModalSave = () => {
        setBrand(defaultBrand)
        openModalStateSave()
    }

    return (
        <>

            <div className="card">
                <div className='py-5'>
                    <Button className='p-button-success' icon='pi pi-plus' onClick={openModalSave} />
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
                    globalFilterFields={['id', 'name']}
                    filters={filters1}
                >

                    <Column field="id" header="Id" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="Name" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>

                {/* DELETE */}

                <Dialog
                    visible={modalDelete}
                    style={{ width: '450px' }}
                    header="Confirm" modal
                    footer={deleteBrandDialogFooter}
                    onHide={() => closeModalStateDelete()}
                >
                    <div className="confirmation-content flex items-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {brand.id != 0 && <span>Are you sure you want to delete <b className='capitalize'>{brand.name}</b>?</span>}
                    </div>
                </Dialog>

                {/* SAVE */}

                <Dialog visible={modalUpdate} style={{ width: '450px' }} header={brand.id == 0 ? 'New Brand' : 'Update Brand'} modal className="p-fluid" onHide={closeModalUpdate}>
                    <FormBrand onHandleSubmitSaveBrand={onHandleSubmitSaveBrand} closeModalUpdate={closeModalUpdate} defaultValues={brand} />

                </Dialog>


                <Toast ref={toast} />

            </div>
        </>
    )
}
