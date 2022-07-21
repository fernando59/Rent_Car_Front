import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Controller, useForm } from "react-hook-form";
export const FormLogin = () => {

    interface  ILogin{
        email:string
        password:string 
    }
    const defaultValues:ILogin = {
        email: '',
        password: '',
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const getFormErrorMessage = (name:any) => {
        const key = name as keyof ILogin
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };
    
    const onHandleSubmit =(data:any)=>{
        console.log(data)
        
    }
    return (
        <>
        <form  onSubmit={handleSubmit(onHandleSubmit)} autoComplete='off' className="p-fluid">


            <div className="field my-10">
                <span className="p-float-label p-input-icon-right">
                    <i className="pi pi-envelope" />
                    <Controller name="email" control={control}
                        rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                        render={({ field, fieldState }) => (
                            <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.error })} />
                        )} />
                    <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email</label>
                </span>
                {getFormErrorMessage('email')}
            </div>
            <div className="field my-4">
                <span className="p-float-label">
                    <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                        <Password {...field}  toggleMask feedback={false} className={classNames({ 'p-invalid': fieldState.error })}   />
                    )} />
                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password</label>
                </span>
                {getFormErrorMessage('password')}
            </div>
            <Button label='Login' type='submit'/>
        </form>
        </>
    )
}
