import { useEffect, useState } from "react";
import { requestCallLogPermission } from "../service/permissionRequest";

import CallLogs from 'react-native-call-log';

const useCallLogs = () => {

    const [callLogData, setCallLogData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const allowedToGetCallLogs = await requestCallLogPermission();
        if(allowedToGetCallLogs ){
            const logs = CallLogs.loadAll();
            setCallLogData(logs);
        }
    }

    return {
        callLogData
    }
}

export default useCallLogs;