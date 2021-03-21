export type CallLog = {
    phoneNumber: string,
    duration: number,
    name: string,
    timestamp: string,
    dateTime: string,
    type: "OUTGOING" | "INCOMING" | "MISSED" | "UNKNOWN",
    rawType: number,
}