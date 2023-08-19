import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip,} from 'chart.js';
import {Line} from 'react-chartjs-2';
// @ts-ignore
import faker from 'faker'
import {CardProps} from "./card.tsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Data',
        },
    },
};


type ChartProps = {
    options?: any
    cardProps: CardProps
}


const ChartComponent = ({cardProps}: ChartProps) => {
    const labels = cardProps.data.map((data) => data.time);
    const chartData = {
        labels,
        datasets: [
            {
                label: cardProps.title,
                data: cardProps.data.map((data) => data.value),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <Line options={options} data={chartData}/>
    );
};

export default ChartComponent;
