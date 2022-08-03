import { TableOrder } from "../components/Order/TableOrder/TableOrder"

export const OrderPage = () => {
    return (
        <>
            <div className="bg-white shadow-sm rounded-t-md p-5 min-h-fit">

                <h1 className="text-center text-4xl font-bold pb-10">List of Orders</h1>
                <TableOrder />
            </div>
        </>

    )
}
