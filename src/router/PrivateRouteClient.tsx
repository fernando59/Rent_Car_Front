import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

interface Props {
  children: any
}

export const PrivateRouteClient: FC<Props> = ({ children }) => {
  const { status, user } = useAuthStore();
  return status === 'authenticated' && user.rols==='Client'
    ? children :
    <Navigate to='/' />
}
