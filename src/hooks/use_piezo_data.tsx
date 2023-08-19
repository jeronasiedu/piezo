import {useEffect, useState} from "react";
import {DataSnapshot, onValue, ref} from "firebase/database";
import {db} from "../config/firebase_config.ts";
import toast from "react-hot-toast";
import {useAuth} from "../providers/auth_provider.tsx";


export type DataPoint = {
    time: string,
    value: number,
    unit: "AMP" | "VOLT" | "WATT" | "PERCENT",
}

export const usePiezoData = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const {user} = useAuth();
    const [current, setCurrent] = useState<DataPoint[]>([]);
    const [voltage, setVoltage] = useState<DataPoint[]>([]);
    const [power, setPower] = useState<DataPoint[]>([]);
    const [batteryPercent, setBatteryPercent] = useState<DataPoint[]>([]);
    const [batteryVoltage, setBatteryVoltage] = useState<DataPoint[]>([]);


    useEffect(() => {
        const userDataRef = ref(db, "UsersData");
        const onPiezoDataChange = (snapshot: DataSnapshot) => {
            const userData = snapshot.val();
            const firstDocumentKey = Object.keys(userData)[0];
            const firstDocumentData = userData[firstDocumentKey];
            if (firstDocumentData.batteryPercent <= 20 && user !== null) {
                toast.error("Battery is low, please recharge", {
                    id: "battery-low",
                    duration: 5000,
                })
            } else if (firstDocumentData.batteryPercent > 99 && user !== null) {
                toast.success("Battery is full.", {
                    id: "battery-full",
                    duration: 5000,
                })
            }

            const piezoCurrent = Object.keys(userData).map((key) => {
                return {
                    time: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    value: userData[key].piezoCurrent,
                    unit: "AMP" as const,
                };
            })

            const piezoVoltage = Object.keys(userData).map((key) => {
                return {
                    time: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    value: userData[key].piezoVoltage,
                    unit: "VOLT" as const,
                };
            })

            const piezoPower = Object.keys(userData).map((key) => {
                return {
                    time: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    value: userData[key].piezoPower,
                    unit: "WATT" as const,
                };
            })
            const batteryPercent = Object.keys(userData).map((key) => {
                return {
                    time: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    value: userData[key].batteryPercent,
                    unit: "PERCENT" as const,
                };
            })

            const batteryVoltage = Object.keys(userData).map((key) => {
                return {
                    time: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
                    value: userData[key].batteryVoltage,
                    unit: "VOLT" as const,
                };
            })

            setBatteryVoltage((prev) => [...prev, ...batteryVoltage]);
            setCurrent((prev) => [...prev, ...piezoCurrent]);
            setVoltage((prev) => [...prev, ...piezoVoltage]);
            setPower((prev) => [...prev, ...piezoPower]);
            setBatteryPercent((prev) => [...prev, ...batteryPercent]);
            setLoading(false);
        };

        onValue(userDataRef, onPiezoDataChange);

        return () => {
            onValue(userDataRef, onPiezoDataChange);
        };
    }, [user]);

    return {loading, current, voltage, power, batteryPercent, batteryVoltage};
};
