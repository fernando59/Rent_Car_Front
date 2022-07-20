
export const StatisticsCards = () => {
    return (
        <>

            <div className="shadow-lg p-3 border border-50 rounded-sm">
                <div className="flex justify-between mb-3">
                    <div>
                        <span className="block text-gray-500 font-medium mb-3">Orders</span>
                        <div className="text-gray-900 font-medium text-xl">152</div>
                    </div>
                    <div className="flex items-center justify-center bg-blue-100 rounded-sm p-2" >
                        <i className="pi pi-shopping-cart text-blue-500 text-2xl h-10"></i>
                    </div>
                </div>
                <span className="text-green-500 font-medium">24 new </span>
                <span className="text-gray-500">since last visit</span>
            </div>
        </>
    )
}
