import classNames from "classnames";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { FC, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useGetUsersQuery, useGetVehiclesOnlyOpenQuery } from "../../../store/apis";


interface Props {
    onHandleSubmitCreateOrder: (data: any) => void
    defaultValues: any
    closeModalOrder: () => void
}

export const FormCreateOrderAdmin: FC<Props> = ({ defaultValues, onHandleSubmitCreateOrder, closeModalOrder }) => {
    const { control, setValue, formState: { errors }, handleSubmit, getValues, watch } = useForm({
        defaultValues: {
            startDate: undefined,
            endDate: undefined,
            userId: 0,
            VehicleId: 0

        }
    });
    const { data: vehicles } = useGetVehiclesOnlyOpenQuery()
    const { data: users } = useGetUsersQuery()

    const [state, setState] = useState({
        total: 0,
        days: 0,
        dailyRate: 0
    })

    const startDate = useRef<any>({});
    startDate.current = watch("startDate");

    const handleStartDate = (e: any) => {
        const value = e.value
        let endDate: any = getValues('endDate')
        if (endDate !== undefined) {
            let days = endDate.getDate() - value.getDate()
            if (days === 0) days = 1
            if (days < 0) days = 0
            setState({ ...state, days: days, total: days * state.dailyRate })
        } else {
            setState({ ...state, days: 0, total: 0 })
        }
        setValue('startDate', value)
    }
    const handleEndDate = (e: any) => {
        const value = e.value
        let startDate: any = getValues('startDate')
        if (startDate !== undefined) {
            let days = value.getDate() - startDate.getDate()
            if (days == 0) days = 1
            if (days < 0) days = 0
            setState({ ...state, days: days, total: days * state.dailyRate })
        } else {
            setState({ ...state, days: 0, total: 0 })
        }

        setValue('endDate', value)
    }

    const onChangeVehicle = (e: any) => {
        const value = e.value
        setValue('VehicleId', value)
        const vehicle = vehicles?.find(i => i.id === value)
        if (vehicle != undefined)
            setState({ ...state, dailyRate: vehicle?.price })
    }

    const isMaxDate = (e: any) => {
        const endDate = e
        if (startDate.current !== undefined) {
            const res = endDate.getDate() - startDate.current.getDate()
            if (res < 0) {
                return false
            }
            return true
        }
        return true
    }

    return (
        <>

            <form onSubmit={handleSubmit(onHandleSubmitCreateOrder)} autoComplete='off' className="p-fluid">
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="VehicleId"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                // let value = 0
                                // if (typeof (field.value) == "number") {
                                //     value = field.value

                                // } else {
                                //     const data = field.value as unknown as ITypeVehicle
                                //     value = data.id

                                // }
                                return <Dropdown filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={field.value} onChange={onChangeVehicle} options={vehicles} optionLabel="plate" optionValue="id" />
                            }}
                        />
                        <label>Vehicle</label>
                    </span>
                </div>
                <div className="field my-10">
                    <span className="p-float-label">
                        <Controller
                            control={control}
                            name="userId"
                            rules={{ required: true }}
                            render={({ field }
                            ) => {
                                // let value = 0
                                // if (typeof (field.value) == "number") {
                                //     value = field.value

                                // } else {
                                //     const data = field.value as unknown as ITypeVehicle
                                //     value = data.id

                                // }
                                return <Dropdown filter showClear filterBy="email" className='w-full min-w-[250px] capitalize' id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={users} optionLabel="email" optionValue="id" />
                            }}
                        />
                        <label>Users</label>
                    </span>
                </div>

                <div className='h-[85px]'>

                    <span className="p-float-label">
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: "Start Date is required" }}
                            render={({ field }
                            ) => (
                                <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={handleStartDate} dateFormat="dd/mm/yy" showIcon />
                            )}
                        />

                        <label className={classNames({ "p-error": errors.startDate })}>Start Date </label>
                    </span>
                    {/* {getFormErrorMessage('startDate')} */}
                </div>

                <div className='h-[95px]'>

                    <span className="p-float-label">
                        <Controller
                            name="endDate"
                            control={control}
                            rules={{ required: "End Date is required", validate: isMaxDate }}
                            render={({ field }
                            ) => (
                                <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={handleEndDate} dateFormat="dd/mm/yy" showIcon />
                            )}
                        />
                        <label className={classNames({ "p-error": errors.endDate })}>End Date
                        </label>
                    </span>
                    {errors?.endDate && errors?.endDate?.type === "validate" && (
                        <small className="p-error">Start date must be greater than end date</small>
                    )}
                </div>
                <div className="field">

                    <div className="field h-[85px]">
                        <span className="p-float-label p-input-icon-right">
                            <InputText disabled value={state.days} style={{ background: '#F8F8F8' }} />
                            <label htmlFor="name" >Days</label>
                        </span>
                        {/* {getFormErrorMessage('name')} */}
                    </div>
                </div>
                <div className="field">

                    <div className="field h-[85px]">
                        <span className="p-float-label p-input-icon-right">
                        <InputNumber disabled value={state.dailyRate} style={{ background: '#F8F8F8',textAlign:'right' }}  mode="currency" currency="USD" locale="en-US" />
                            <label htmlFor="name" >Daily Rate</label>
                        </span>
                        {/* {getFormErrorMessage('name')} */}
                    </div>
                </div>
                <div className="field">

                    <div className="field h-[85px]">
                        <span className="p-float-label p-input-icon-right">
                            {/* <InputText disabled value={state.total} style={{ background: '#F8F8F8' }} /> */}
                            <InputNumber disabled value={state.total} style={{ background: '#F8F8F8',textAlign:'right' }}  mode="currency" currency="USD" locale="en-US" />
                            <label htmlFor="name" >Total</label>
                        </span>
                        {/* {getFormErrorMessage('name')} */}
                    </div>
                </div>

                <div className="flex gap-4 w-full justify-end ">
                    <div className="grow-0">

                        <Button label="Cancel" icon="pi pi-times" className="p-button-text" type="button" onClick={closeModalOrder} />
                    </div>
                    <div className="grow-0">

                        {/* <Button label="Rent" icon="pi pi-check" className="p-button-text" type='submit' loading={isLoading} disabled={isSuccess} /> */}
                        <Button label="Rent" icon="pi pi-check" className="p-button-text" type='submit' />
                    </div>
                </div>

            </form>
        </>
    )
}
