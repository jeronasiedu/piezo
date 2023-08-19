import ChartComponent from "./chart_component.tsx";
import {useCardModalStore} from "../store/card_store.ts";
import {DataPoint} from "../hooks/use_piezo_data.tsx";

export type CardProps = {
    title: "current" | "voltage" | "power"
    unit: "AMP" | "VOLT" | "WATT"
    data: DataPoint[]
}
const Card = ({title, unit, data}: CardProps) => {
    const {openModal} = useCardModalStore((state) => ({
        openModal: state.open,
    }))
    const now = new Date()
    const date = `${now.getDate()} ${now.toLocaleString('default', {month: 'long'})} ${now.getFullYear()}`
    const lowestValue = data.reduce((prev, current) => (prev.value < current.value) ? prev : current)
    const highestValue = data.reduce((prev, current) => (prev.value > current.value) ? prev : current)

    return (
        <div className="w-full bg-white shadow min-h-[25rem] rounded-lg p-4">
            <div className={'flex items-center justify-between mb-8'}>
                <h4 className={'font-semibold'}><span className={'capitalize'}>{title}</span> Rate</h4>
                <button className={'btn_outline'}>Today</button>
            </div>
            <div className={'flex flex-col gap-1 mb-4 '}>
                <h4 className={'text-3xl font-bold'}>{lowestValue.value}-{highestValue.value} <span
                    className={'text-sm text-gray-500 font-normal'}>{unit}</span></h4>
                <p className={'text-sm text-gray-500'}>{date}</p>
            </div>
            <ChartComponent cardProps={{
                unit,
                title,
                data
            }}/>
            <button className={'btn_primary w-full mt-4 '} onClick={() => {
                openModal(
                    {props: {unit, title, data}}
                )
            }}>
                View Details
            </button>
        </div>
    );
};

export default Card;
