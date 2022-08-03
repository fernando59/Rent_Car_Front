import { FC } from "react"

interface Props{
    background:string
    textColor:string
    text:string
}
export const ChipTable:FC<Props> = ({background="#C8E6C9",text,textColor="#256029"}) => {
  return (
    <span className={`rounded-md font-bold py-2 px-5 ${background}  ${textColor} `}>{text}</span>
  )
}
