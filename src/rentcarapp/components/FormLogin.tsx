import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { FC, useRef } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/apis/authApi';
import { loginAuth } from '../../store/slices';


interface Props{
    closeModal?:()=>void
}
export const FormLogin:FC<Props> = ({closeModal}) => {
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation()
    const toast = useRef<any>(null);
    interface ILogin {
        email: string
        password: string
    }
    const defaultValues: ILogin = {
        email: '',
        password: '',
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const getFormErrorMessage = (name: any) => {
        const key = name as keyof ILogin
        return errors[key] && <small className="p-error">{errors[key]?.message}</small>
    };

    const onHandleSubmit = async (data: any) => {
        try{

        const res = await login(data).unwrap()
        if (res.token) {
            toast.current.show({ severity: 'success', summary: 'Successfull', detail: 'Login Successfull', life: 3000 });
            dispatch(loginAuth(res.token))
            if(closeModal)closeModal()
        }else{

            toast.current.show({ severity: 'error', summary: 'Error', detail: 'User or Password are incorrect', life: 3000 });
        }
        }catch(e){
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'User or Password are incorrect', life: 3000 });
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete='off' className="p-fluid w-full">


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
                            <Password {...field} toggleMask feedback={false} className={classNames({ 'p-invalid': fieldState.error })} />
                        )} />
                        <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password</label>
                    </span>
                    {getFormErrorMessage('password')}
                </div>
                <Button label='Login' type='submit' loading={isLoading} />
            </form>
            <Toast ref={toast} />
        </>
    )
}
