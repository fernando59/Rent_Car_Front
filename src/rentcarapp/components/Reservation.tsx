import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Controller, useForm } from 'react-hook-form';
import { useGetBrandsQuery } from '../../store/apis';


export const Reservation = () => {
    
    const {  handleSubmit,  formState: { errors }, control } = useForm({
        defaultValues: {
            brand: null,
            startDate:undefined,
            endDate:undefined,
        }
    });
    const {data} = useGetBrandsQuery()

    const onHandleSubmit = (data: any) => {
        console.log(data)
    }
    return <>


        <h2 className='text-6xl font-bold text-center py-10'>Find Best Vehicles</h2>
        <div className='flex justify-center h-full'>

            <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete="off" className='flex items-end flex-col md:flex-row gap-2 h-full'>

                <label>
                    <span className='block'>Select your brand</span>
                    <Controller
                        control={control}
                        name="brand"
                        rules={{ required: true, min: 0, max: 400 }}
                        render={({ field }
                        ) => (
                            <Dropdown  filter showClear filterBy="name" className='w-full min-w-[250px] capitalize' id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={data} optionLabel="name" />
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
