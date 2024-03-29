import classNames from "classnames";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { FC, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../store/apis";

interface Props {
    dailyRate?: number
    vehicleId?: number
    toast: any
    closeModal:()=>void
}
export const FormRentCar: FC<Props> = ({ dailyRate = 0, vehicleId = 0, toast,closeModal }) => {
    const { control, watch, formState: { errors }, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            startDate: undefined,
            endDate: undefined,

        }
    });
    const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation()
    const navigate = useNavigate()
    const [state, setState] = useState({
        total: 0,
        days: 0,
        dailyRate
    })
    const startDate = useRef<any>({});
    startDate.current = watch("startDate");

    const onHandleSubmitRentCar = async (data: any) => {
        data.VehicleId = vehicleId
        const res = await createOrder(data).unwrap()
        const { success } = res
        if (success) {
            toast.current.show({ severity: 'success', summary: 'Successfull', detail: 'Successful Rent', life: 2000 });
            localStorage.removeItem('startDate')
            localStorage.removeItem('endDate')
            localStorage.removeItem('brand')
            await new Promise(resolve => setTimeout(resolve, 2000))
            navigate('/history')
        } else {

            toast.current.show({ severity: 'error', summary: 'Error', detail: 'An error has occured', life: 2000 });
        }


    }

    // const getFormErrorMessage = (name: any) => {
    //     const key = name as keyof IBrand
    //     return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    // };
    useEffect(() => {
        const item = localStorage.getItem('startDate')
        let startDate = item ? JSON.parse(item) : null

        const item2 = localStorage.getItem('endDate')
        let endDate = item2 ? JSON.parse(item2) : null

        if (startDate != null && endDate != null) {

            startDate = new Date(startDate)
            endDate = new Date(endDate)
            let days = endDate.getDate() - startDate.getDate()
            setValue('startDate', startDate)
            setValue('endDate', endDate)
            setState({ ...state, days: days, total: days * state.dailyRate })
        }


    }, [setValue])

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
        <form onSubmit={handleSubmit(onHandleSubmitRentCar)} autoComplete='off' className="p-fluid">


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
                {/* {getFormErrorMessage('endDate')} */}
            </div>
            <div className="field">

                <div className="field h-[85px]">
                    <span className="p-float-label p-input-icon-right">
                        <InputText disabled value={state.days} style={{ background: '#F8F8F8' }} />
                        <label htmlFor="name" >Days</label>
                    </span>
                </div>
            </div>
            <div className="field">

                <div className="field h-[85px]">
                    <span className="p-float-label p-input-icon-right">
                        <InputNumber disabled value={state.dailyRate} style={{ background: '#F8F8F8',textAlign:'right' }}  mode="currency" currency="USD" locale="en-US" />
                        <label htmlFor="name" >Daily Rate</label>
                    </span>
                </div>
            </div>
            <div className="field">

                <div className="field h-[85px]">
                    <span className="p-float-label p-input-icon-right">
                        <InputNumber disabled value={state.total} style={{ background: '#F8F8F8',textAlign:'right' }}  mode="currency" currency="USD" locale="en-US" />
                        <label htmlFor="name" >Total</label>
                    </span>
                </div>
            </div>

            <div className="flex gap-4 w-full justify-end ">
                <div className="grow-0">

                    <Button label="Cancel" icon="pi pi-times" className="p-button-text" type="button" onClick={closeModal} />
                </div>
                <div className="grow-0">

                    <Button label="Rent" icon="pi pi-check" className="p-button-text" type='submit' loading={isLoading} disabled={isSuccess} />
                </div>
            </div>

        </form>
    )
}
