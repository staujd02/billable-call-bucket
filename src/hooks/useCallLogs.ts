import { useEffect, useState } from "react";
import { requestCallLogPermission } from "../service/permissionRequest";
import { CallLog } from "../../types/calls";

import CallLogs from 'react-native-call-log';

const useCallLogs = () => {

    const [callLogData, setCallLogData] = useState<Array<CallLog>>([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const allowedToGetCallLogs = await requestCallLogPermission();
        if(allowedToGetCallLogs){
            const logs = await CallLogs.load(5);
            setCallLogData(logs);
        }
    }

    return {
        callLogData
    }
}

export default useCallLogs;