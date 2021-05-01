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

export type NewClient = {
    name: string,
    description: string,
}

export type Client = {
    pk: Guid,
    name: string,
    description: string,
    bills: Array<Bill>
}

export type Bill = {
    pk: Guid,
    isBilled: boolean,
    isFinalized: boolean,
    calls: Array<Call>
}

export type Call = {
    pk: Guid,
    callReason: string,
    contactNotes: string,
    phoneNumber: string,
    duration: number,
    timestamp: string,
    dateTime: Date,
    type: string,
}