import { FC } from "react";
interface Props {
    title: string
    valueNumber:number
    icon:string
    backgroundIcon:string
    colorIconText:string
}
export const CardDashboard: FC<Props> = ({ title="Title",valueNumber=0,icon="pi-shopping-cart",backgroundIcon="bg-[#D0E1FD]",colorIconText="text-blue-500 " }) => {
    return (
        <>

            <div className="bg-white rounded-lg p-5 shadow-md">
                <div className="flex justify-between">

                    <div>
                        <span className='font-medium text-[#9E9E9E] text-lg'>

                        {title}
                        </span>
                        <div>
                            <span className='font-medium text-2xl'>

                            {valueNumber}
                            </span>
                        </div>
                    </div>
                    <div>
                    <div className={`flex justify-center items-center w-10 h-10 ${backgroundIcon}  rounded-md`}>

                    <i className={`pi ${icon} ${colorIconText}  text-xl`}></i>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
