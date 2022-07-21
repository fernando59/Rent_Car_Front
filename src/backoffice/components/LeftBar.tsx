import { FC } from "react"

interface Props{
    children:JSX.Element
}

export const LeftBar:FC<Props> = ({ children }) => {
    return (
        <>
            <div className="fixed w-[300px] z-10 top-32 left-8 rounded-md shadow-md h-[calc(100vh-9rem)] bg-white p-6 overflow-auto">
                {children}
            </div>
        </>
    )
}
