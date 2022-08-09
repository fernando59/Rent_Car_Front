import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";


export const PrivateRouteAdmin= () => {
  const { status, user } = useAuthStore();
  if(status ==='cheking') return <Outlet/>
  return status === 'authenticated' && user.rols === 'Admin'
    ? <Outlet /> :
    <Navigate to='/backoffice/login' />
}
