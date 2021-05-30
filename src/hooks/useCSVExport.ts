import { Call, Client } from "../../types/calls";
import { formatHoursMinutesSeconds, formatPhoneNumber, formatTimestamp } from "../service/formatter";
import { requestFileWritePermission } from "../service/permissionRequest";
import useBills from "./useBills";
import useClients from "./useClients";
import useFileStorage from "./useFileStorage";

const useCSVExport = () => {

    const {
        getClientsWithOpenBillsIteratorableValue,
    } = useClients();

    const {
        getOpenBill
    } = useBills();

    const {
        saveFile
    } = useFileStorage();

    const exportAllOpenBills = async () => {
        if (await requestFileWritePermission()) {
            const clients = await getClientsWithOpenBillsIteratorableValue();
            await saveFile(makeClientIterator(clients));
        }
    }

    async function* makeClientIterator(clients) {
        yield fileHeader();
        for (const c of clients)
            for (const call of (await getOpenBill(c.pk)).calls)
                yield formatCallToCSVLine(call, c);
    }

    function fileHeader() {
        return [
            encapsulate("Client Name"),
            encapsulate("Client Description"),
            encapsulate("Phone Call Number"),
            encapsulate("Call Contact Note"),
            encapsulate("Call Note"),
            encapsulate("Call Duration"),
            encapsulate("Call Was Marked As Billed"),
            encapsulate("Call Timestamp"),
            encapsulate("Call Direction"),
        ].join(",").concat("\n");
    }

    function formatCallToCSVLine(call: Call & Realm.Object, client: Client): string {
        return [
            encapsulate(client.name),
            encapsulate(client.description),
            formatPhoneNumber(call.phoneNumber),
            encapsulate(call.contactNotes),
            encapsulate(call.callReason),
            formatHoursMinutesSeconds(call.duration),
            formatIsBilled(call.isBilled),
            formatTimestamp(call.timestamp),
            encapsulate(call.type),
        ].join(",").concat("\n");
    }

    const encapsulate = (s: string) => `"${s}"`;
    const formatIsBilled = (billed: boolean) => billed ? "Marked as Billed" : "";

    return {
        exportAllOpenBills
    }
}

export default useCSVExport;