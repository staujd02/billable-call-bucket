import { useEffect, useState } from "react";
import { requestCallLogPermission } from "../service/permissionRequest";
import { CallLog } from "../../types/calls";

import CallLogs from 'react-native-call-log';

const useCallLogs = () => {

    const [callLogData, setCallLogData] = useState<Array<CallLog>>([]);
    const meaningCallFilter = (value: CallLog, index: number, array: CallLog[]): boolean =>
        value.type === "INCOMING" || value.type === "OUTGOING";
    const filterLogs = (logs: CallLog[]) => logs.filter(meaningCallFilter);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        if ((await requestCallLogPermission())){
            const logs: Array<CallLog> = await CallLogs.load(5);
            setCallLogData(filterLogs(logs));
        }
    }

    return {
        callLogData
    }
}

export default useCallLogs;