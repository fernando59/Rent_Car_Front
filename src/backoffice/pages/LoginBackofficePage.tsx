import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";
import { FormLogin } from "../../rentcarapp/components/FormLogin";

export const LoginBackofficePage = () => {
  const { status, user } = useAuthStore();

  return status === 'authenticated' && user.rols === 'Admin' ? <Navigate to="/backoffice/" /> : (
    <>
      <div className="flex flex-col h-screen w-full items-center justify-center">

        <h1 className="text-center font-bold text-3xl">Login BackOffice</h1>
        <div>
          <FormLogin isBackoffice={true} />
        </div>

      </div>
    </>
  )
}
