import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";


export const PrivateRouteClient = () => {
  const { status, user } = useAuthStore();
  if(status ==='cheking') return <Outlet/>
  return status === 'authenticated' && user.rols === 'Client'
    ? <Outlet /> :
    <Navigate to='/' />
}
