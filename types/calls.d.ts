export type CallLogType = "OUTGOING" | "INCOMING" | "MISSED" | "UNKNOWN";
export type CallLog = {
    phoneNumber: string,
    duration: number,
    name: string,
    timestamp: string,
    dateTime: string,
    type: CallLogType,
    rawType: number,
}