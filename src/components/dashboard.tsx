import Card from "./card.tsx";
import {usePiezoData} from "../hooks/use_piezo_data.tsx";
import Spinner from "./spinner.tsx";

function Dashboard() {
    const {loading: piezoLoading, voltage, current, power} = usePiezoData()


    return <div className={'max-w-6xl mx-auto p-4'}>
        <h1 className={'text-lg md:text-2xl lg:text-3x text-center mb-12'}>PIEZOELECTRIC READER</h1>
        {piezoLoading ? <div className={'p-3 flex items-center justify-center w-full'}>
            <Spinner/>
        </div> : <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8  gap-4'}>
            <Card title={"current"} unit={"AMP"} data={current}/>
            <Card title={'voltage'} unit={'VOLT'} data={voltage}/>
            <Card title={'power'} unit={'WATT'} data={power}/>
        </div>}

    </div>
}

export default Dashboard
