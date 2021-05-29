import { formatHoursMinutesSeconds, formatPhoneNumber, formatTimestamp } from "../service/formatter";
import { requestFileWritePermission } from "../service/permissionRequest";
import useClients from "./useClients";
import useFileStorage from "./useFileStorage";

const useCSVExport = () => {

    const {
        getClientsWithOpenBillsIteratorableValue,
    } = useClients();

    const {
        saveFile
    } = useFileStorage();

    const exportAllOpenBills = async () => {
        if(await requestFileWritePermission()){
            const calls = await getClientsWithOpenBillsIteratorableValue();
            await saveFile(makeCallMapIterator(calls));
        }
    }

    function* makeCallMapIterator(calls: IterableFlattenCalls) {
        for (const call of calls)
            yield formatCallToCSVLine(call);
    }

    function formatCallToCSVLine(call: FlattenedCall) {
        return [
            encapsulate(call.clientName),
            encapsulate(call.description),
            formatNumber(call.phoneNumber),
            encapsulate(call.contactNotes),
            encapsulate(call.callReason),
            formatHoursMinutesSeconds(call.duration),
            formatisBilled(call.isBilled),
            formatTimestamp(call.timestamp),
            encapsulate(call.type),
        ].join(",").concat("\n");
    }

    const formatNumber = s => s ? formatPhoneNumber(s) : "";
    const encapsulate = (s: string) => `"${s}"`;
    const formatisBilled = (billed: boolean) => billed ? "Marked as Billed" : "";

    return {
        exportAllOpenBills
    }
}

export default useCSVExport;

type FlattenedCall = {
    clientName: string;
    description: string;
    pk: string;
    isBilled: boolean;
    callReason: string;
    contactNotes: string;
    phoneNumber: string;
    duration: number;
    timestamp: string;
    type: string;
};
type IterableFlattenCalls = IterableIterator<FlattenedCall>;