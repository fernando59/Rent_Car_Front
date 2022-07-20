import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
export const Reservation = () => {
    const [date, setDate] = useState<Date | Date[] | undefined>(undefined)
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm({
        defaultValues: {
            location: '',
            startDate:undefined,
            endDate:undefined,
        }
    });

    const onHandleSubmit = (data: any) => {
        console.log(data)
    }
    return <>


        <h2 className='text-6xl font-bold text-center py-10'>Book Now</h2>
        <div className='flex justify-center h-full'>

            <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off" className='flex items-center flex-col md:flex-row gap-2 h-full'>

                <label>
                    <span> Vehicle delivery location </span>
                    <Controller
                        control={control}
                        name="location"
                        rules={{ required: true, min: 0, max: 400 }}
                        render={({ field }
                        ) => (
                            <InputText className='block '{...field} placeholder="Select your Location" />
                        )}
                    />

                </label>
                <label>
                    <span className='block'>Date Start </span>
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: true}}
                        render={({ field }
                        ) => (
                            <Calendar className='block ' readOnlyInput={true}  value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon  />
                        )}
                    />
                </label>
                <label>
                    <span className='block'>Date End</span>
                    <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: true}}
                        render={({ field }
                        ) => (
                            <Calendar className='block ' readOnlyInput={true} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" showIcon  />
                        )}
                    />
                </label>

                <Button label="Search" icon="pi pi-search" type='submit' />
            </form>
        </div>
    </>
}
