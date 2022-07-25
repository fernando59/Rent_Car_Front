import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { useGetVehiclesQuery } from '../../../store/apis/vehicleApi';
import { ChipTable } from './ChipTable';
import { FormVehicles } from './FormVehicles';

export const TableVehicles = () => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const { data } = useGetVehiclesQuery()
    const [filters1, setFilters1] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    //Modal Save
    const {
        openModalState: openModalStateSave,
        closeModalState: closeModalStateSave,
        modalState: modalUpdate
    } = useModal()

    const statusBodyTemplate = (rowData: any) => {
        const { state } = rowData
        let text = "Open"
        let background = "#C8E6C9" //green
        let textColor = "#256029"//green
        if (state === 0) {
            text = "Remove"

        } else if (state === 2) {
            text = "Busy"
            background = "#EFA3A7"//red
            textColor = "#C63737"//red

        } else if (state === 3) {
            text = "Maintenance"
            background = "#FEEDAF"//yellow
            textColor = "#8A5340"//yellow
        }

        return <ChipTable text={text} background={background} textColor={textColor} />

    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <div className='flex justify-end pr-10 gap-2'>
                <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary mr-2" onClick={() => { }} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => { }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => { }} />
            </div>
        );
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
    const openModalSave = () => {
        openModalStateSave()
    }
    const closeModalUpdate = () => {
        closeModalStateSave()
        // setBrand(defaultBrand)
    }

    return (
        <>

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
                globalFilterFields={['id', 'plate', 'modelVehicle.name', 'brandVehicle.name', 'price']}
                filters={filters1}
            >

                <Column field="id" header="Id" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="plate" header="Plate" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="brandVehicle.name" header="Brand" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="modelVehicle.name" header="Model" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="price" header="Price" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="state" header="State" className='capitalize' body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
            <Dialog visible={modalUpdate} modal onHide={closeModalUpdate}>
                <FormVehicles />
            </Dialog>
        </>
    )
}
