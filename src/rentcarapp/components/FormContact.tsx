import classNames from "classnames";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Controller, useForm } from "react-hook-form";
export const FormContact = () => {
    const { control, formState: { errors }, handleSubmit, reset, watch } = useForm({});
    const onHandleSubmit = (data: any) => {
        console.log(data)

    }
    return (
        <>
            <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete='off' className="p-fluid min-w-[350px] max-w-[550px] mx-auto">

                <div className="flex justify-between gap-10">

                    <div className="field mt-10 flex-1">
                        <span className="p-float-label">
                            <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.error })} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Your Name</label>
                        </span>
                    </div>
                    <div className="field mt-10 flex-1">
                        <span className="p-float-label">
                            <Controller name="email" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.error })} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.email })}>Your Email</label>
                        </span>
                    </div>
                </div>

                <div className="flex justify-between gap-10">

                    <div className="field mt-10 flex-1">
                        <span className="p-float-label">
                            <Controller name="subject" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field}  className={classNames({ 'p-invalid': fieldState.error })} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.subject })}>Subject</label>
                        </span>
                    </div>
                    <div className="field mt-10 flex-1">
                        <span className="p-float-label">
                            <Controller name="phone" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                <InputText id={field.name}  className={classNames({ 'p-invalid': fieldState.error })} />
                            )} />
                            <label htmlFor="name" className={classNames({ 'p-error': errors.phone })}>Phone</label>
                        </span>
                    </div>
                </div>
                <div className="field my-10 flex-1">
                    <span className="p-float-label">

                        <Controller name="message" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                            <InputTextarea rows={5} cols={30} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                        )} />
                        <label htmlFor="name" className={classNames({ 'p-error': errors.message })}>Your Message</label>
                    </span>
                </div>
                <Button label="Send Message"/>

            </form>
        </>
    )
}
