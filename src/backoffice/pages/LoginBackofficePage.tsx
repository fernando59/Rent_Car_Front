import { FormLogin } from "../../rentcarapp/components/FormLogin"

export const LoginBackofficePage = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-full items-center justify-center">

        <h1 className="text-center font-bold text-3xl">Login BackOffice</h1>
        <div>
          <FormLogin />
        </div>

      </div>
    </>
  )
}
