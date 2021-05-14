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

export type NewBillbleCall = {
    clientPk: string,
    callReason: string,
    contactNotes: string,
    phoneNumber: string,
    duration: number,
    timestamp: string,
    type: string,
}

export type NewClient = {
    name: string,
    description: string,
}

export type UpdateClient = {
    pk: string,
    name: string,
    description: string,
}

export type Client = {
    pk: string,
    name: string,
    description: string,
    bills: Array<Bill>
}

export type Bill = {
    pk: string,
    finalizedOn: Date,
    calls: Array<Call>
}

export type Call = {
    pk: string,
    isBilled: boolean,
    callReason: string,
    contactNotes: string,
    phoneNumber: string,
    duration: number,
    timestamp: string,
    type: string,
}