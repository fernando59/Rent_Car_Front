import { Chart } from 'primereact/chart';
import { useEffect, useState } from 'react';
import { useGetOrdersChartQuery } from '../../store/apis';

export const ChartPie = () => {
    const { data: chart,  isSuccess } = useGetOrdersChartQuery()
    const [chartData, setChartData] = useState({
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726",
                    "#FFA726",
                    "#FFA726",
                    "#FFA726",
                    "#FFA726",
                    "#FFA726",
                    "#FFA726",
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D",
                    "#FFB74D",
                    "#FFB74D",
                    "#FFB74D",
                    "#FFB74D",
                    "#FFB74D",
                    "#FFB74D",
                    "#FFB74D",
                ]
            }
        ]
    });
    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });
    useEffect(() => {
        if (chart != undefined) {
            console.log('enter')
            setChartData({
                ...chartData, labels:
                    chart.labels, datasets: chartData.datasets.map(el => ({ ...el, data: chart.data }))
            })
        }
    }, [setChartData, chart])
    return (
        <>
            <h1 className='text-center text-3xl font-bold pb-5'>Most Popular Brands </h1>
            {isSuccess &&
                <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
            }
        </>
    )
}
