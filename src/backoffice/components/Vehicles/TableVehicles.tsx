import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { FC, useRef, useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { IVehicleForm, PhotosVehicles } from '../../../models/Vehicle';
import { useCreateVehicleMutation, useDeleteVehicleMutation, useGetVehiclesQuery, useUpdateVehicleMutation } from '../../../store/apis/vehicleApi';
import { ChipTable } from './ChipTable';
import { FormVehicles } from './FormVehicles';


const vehicleDefaultValues: IVehicleForm = {
    id: 0,
    capacity: undefined,
    hasAir: false,
    plate: '',
    price: undefined,
    state: 1,
    year: undefined,
    brandVehicleId: 0,
    modelVehicleId: 0,
    typeVehicleId: 0,
    description: undefined,
    imagePath: undefined,
    photosVehicles: undefined
}

interface Props {
    openSideBar: (data: any) => void
}
export const TableVehicles: FC<Props> = ({ openSideBar }) => {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [vehicle, setVehicle] = useState<IVehicleForm>(vehicleDefaultValues)
    const [image, setImage] = useState<any>()
    const [url, setUrl] = useState<any>(null)
    const toast = useRef<any>(null);
    const [filters1, setFilters1] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    });



    //RKT QUERY
    const { data, isLoading: isLoadingTable } = useGetVehiclesQuery()
    const [createVehicle, { isLoading, isSuccess }] = useCreateVehicleMutation()
    const [updateVehicle] = useUpdateVehicleMutation()
    const [deleteVehicle] = useDeleteVehicleMutation()



    //Modal Save
    const {
        openModalState: openModalStateSave,
        closeModalState: closeModalStateSave,
        modalState: modalUpdate
    } = useModal()
    //Modal Delete
    const {
        openModalState: openModalStateDelete,
        closeModalState: closeModalStateDelete,
        modalState: modalDelete
    } = useModal()


    const openModalDelete = (data: any) => {
        openModalStateDelete()
        setVehicle(data)
    }


    // FILTER
    const filterTable = (e: any) => {
        const value = e.target.value
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;
        setFilters1(_filters1);
        setGlobalFilter(value)
    }
    const openModalSave = () => {
        openModalStateSave()
    }
    const openModalUpdateSave = (data: IVehicleForm) => {
        console.log(data)
        //  data.photosVehicles = data.photosVehicles as PhotosVehicles[]
        const images: PhotosVehicles[] = data.photosVehicles as unknown as PhotosVehicles[]
        if (data.photosVehicles != undefined) {
            const url = ` https://res.cloudinary.com/testapicloudinaryfernando/image/upload/${images[0]?.path}`
            setUrl(url)
            var reader = new FileReader()
            reader.onloadend = () => {

                setImage(reader.result as string)
            }

            var buffer = new ArrayBuffer(32);
        }
        setVehicle(data)
        openModalStateSave()
    }

    const closeModalUpdate = () => {
        closeModalStateSave()
        setUrl(null)
        setVehicle(vehicleDefaultValues)
    }



    const onHandleSubmitSaveVehicle = async (data: IVehicleForm) => {
        try {

            const formData = new FormData();
            if (image != undefined) {
                // formData.append('imagePath', )
                console.log('enter')
                formData.append('imagePath', image)
            }


            formData.append('plate', data.plate)
            formData.append('capacity', data?.capacity?.toString()!)
            formData.append('price', data?.price?.toString()!)
            formData.append('year', data.year?.toString()!)
            formData.append('description', data.description?.toString()!)
            formData.append('brandVehicleId', data.brandVehicleId?.toString()!)
            formData.append('modelVehicleId', data.modelVehicleId?.toString()!)
            formData.append('typeVehicleId', data.typeVehicleId?.toString()!)
            formData.append('hasAir', String(data.hasAir))


            // return
            let res
            if (vehicle.id === 0) {
                res = await createVehicle(formData).unwrap()
            } else {
                data.id = vehicle.id
                const id = vehicle.id?.toString()
                formData.append('id', id!)
                res = await updateVehicle(formData).unwrap()
            }

            const { success, message } = res
            if (success) {
                closeModalUpdate()
                toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
            }
        } catch (e) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'error', life: 3000 });
        }
    }
    const closeModalDelete = () => {
        closeModalStateDelete()
        setVehicle(vehicleDefaultValues)
    }
    const deleteVehicleExecute = async () => {
        const res = await deleteVehicle(vehicle.id!).unwrap()
        const { success, message } = res

        if (success) {
            closeModalDelete()
            toast.current.show({ severity: 'success', summary: 'Successful', detail: message, life: 3000 });
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
        }

    }


    // TEMPLATES
    const deleteVehicleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={closeModalDelete} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteVehicleExecute} />
        </>
    );

    const actionBodyTemplate = (rowData: IVehicleForm) => {
        return (
            <div className='flex justify-end pr-10 gap-2'>
                {/* <SplitButton label="Show" icon="pi pi-eye" onClick={() => openSideBar(rowData)} model={itemsButton}></SplitButton> */}
                <Button icon="pi pi-eye" className="p-button-rounded p-button-secondary mr-2" onClick={() => openSideBar(rowData)} />
                <Button disabled={rowData.state !== 1} icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => openModalUpdateSave(rowData)} />
                <Button disabled={rowData.state !== 1} icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => { openModalDelete(rowData) }} />
            </div>
        );
    }
    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter} type="search" onChange={filterTable} placeholder="Search..." />
            </span>
        </div>
    );



    const statusBodyTemplate = (rowData: any) => {
        const { state } = rowData
        let text = "Open"
        let background = "bg-[#C8E6C9]" //green
        let textColor = "text-[#256029]"//green
        if (state === 0) {
            text = "Remove"

        } else if (state === 2) {
            text = "Busy"
            background = "bg-[#EFA3A7]"//red
            textColor = "text-[#C63737]"//red

        } else if (state === 3) {
            text = "Maintenance"
            background = "bg-[#FEEDAF]"//yellow
            textColor = "text-[#8A5340]"//yellow
        }

        return <ChipTable text={text} background={background} textColor={textColor} />

    }
    const imageBodyTemplate = (rowData: any) => {
        const image = rowData.photosVehicles[0]?.path
        return <img src={`https://res.cloudinary.com/testapicloudinaryfernando/image/upload/${image}`} onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={image} className="w-16 h-16 object-cover" />
    }

    const priceTemplate = (rowData: any) => {
        const price = rowData.price
        return <p>{price} $</p>
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
                loading={isLoadingTable}
                rowsPerPageOptions={[5, 10, 20]}
                header={header}
                globalFilterFields={['id', 'plate', 'modelVehicle.name', 'brandVehicle.name', 'price']}
                filters={filters1}
            >

                <Column field="id" header="Id" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>

                <Column header="Image" headerStyle={{ width: '400px' }} body={imageBodyTemplate}></Column>
                <Column field="plate" header="Plate" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="brandVehicle.name" header="Brand" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="modelVehicle.name" header="Model" className='capitalize' sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="price" header="Price" className='capitalize' body={priceTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="state" header="State" className='capitalize' body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
            {/* SAVE */}
            <Dialog visible={modalUpdate} modal onHide={closeModalUpdate} header={vehicle.id == 0 ? 'New Vehicle' : 'Update Vehicle'} style={{ width: '450px' }}>
                <FormVehicles isLoading={isLoading} setImage={setImage} setUrl={setUrl} url={url} defaultValues={vehicle} onHandleSubmitSaveVehicle={onHandleSubmitSaveVehicle} closeModalUpdate={closeModalUpdate} />
            </Dialog>
            {/* DELETE */}
            <Dialog
                visible={modalDelete}
                style={{ width: '450px' }}
                header="Confirm" modal
                footer={deleteVehicleDialogFooter}
                onHide={() => closeModalStateDelete()}
            >
                <div className="confirmation-content flex items-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {vehicle.id != 0 && <span>Are you sure you want to delete <b className='capitalize'>{vehicle.plate}</b>?</span>}
                </div>
            </Dialog>

            <Toast ref={toast} />
        </>
    )
}
