import { ChipTable } from "../../../../backoffice/components/Vehicles/ChipTable"


export const statusBodyClientTemplate = (rowData: any) => {
    const { status } = rowData
    let text = "Open"
    let background = "bg-[#C8E6C9]" //green
    let textColor = "text-[#256029]"//green
    if (status === 0) {
        text = "Canceled"
        background = "bg-[#EFA3A7]"//red
        textColor = "text-[#C63737]"//red

    } else if (status === 1) {
        text = "Pending"
        background = "bg-[#FEEDAF]"//yellow
        textColor = "text-[#8A5340]"//yellow
    } else if (status === 2) {
        text = "Confirmed"
        background = "bg-[#C8E6C9]"//green
        textColor = "text-[#548757]"//green


    } else if (status === 3) {
        text = "Finished"
        background = "bg-[#EFA3A7]"//red
        textColor = "text-[#C63737]"//red

    }

    return (<ChipTable text={text} background={background} textColor={textColor} />)

}

export const startDateBodyClientTemplate = (rowData: any) => {
    const { startDate } = rowData
    const date = new Date(startDate).toLocaleDateString('en-Us')
    return <p>{date}</p>
}

export const endDateBodyClientTemplate = (rowData: any) => {
    const { endDate } = rowData
    const date = new Date(endDate).toLocaleDateString('en-Us')
    return <p>{date}</p>
}