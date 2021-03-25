import { useEffect, useState } from "react";
import { requestCallLogPermission } from "../service/permissionRequest";
import { CallLog } from "../../types/calls";

import CallLogs from 'react-native-call-log';

const useCallLogs = () => {

    const DEFAULT_AMOUNT = 8;
    const [numberLoaded, setNumberLoaded] = useState<number>(DEFAULT_AMOUNT);
    const [callLogData, setCallLogData] = useState<Array<CallLog>>([]);
    const meaningCallFilter = (value: CallLog, index: number, array: CallLog[]): boolean =>
        value.type === "INCOMING" || value.type === "OUTGOING";
    const filterLogs = (logs: CallLog[]) => logs.filter(meaningCallFilter);

    useEffect(() => {
        fetchData(DEFAULT_AMOUNT);
    }, []);

    async function fetchData(count) {
        if ((await requestCallLogPermission())){
            const logs: Array<CallLog> = await CallLogs.load(count);
            setCallLogData(filterLogs(logs));
            setNumberLoaded(count);
        }
    }

    async function loadMore(count:number) {
       await fetchData(numberLoaded + count); 
    }

    return {
        loadMore,
        callLogData,
        refreshLogs: () => fetchData(numberLoaded), 
    }
}

export default useCallLogs;