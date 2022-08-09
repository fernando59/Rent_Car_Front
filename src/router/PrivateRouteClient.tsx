import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";


export const PrivateRouteClient = () => {
  const { status, user } = useAuthStore();
  console.log(status === 'authenticated' && user.rols === 'Client')
  return status === 'authenticated' && user.rols === 'Client'
    ? <Outlet /> :
    <Navigate to='/' />
}
