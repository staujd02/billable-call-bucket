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

export type CallDetailUpdate = {
    callPk: string,
    callReason: string,
    contactNotes: string,
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
    bills: Realm.Results<Bill & Realm.Object & ThingsIKnowExist>
}

export type Bill = {
    pk: string,
    finalizedOn: Date,
    calls: Realm.Results<Call & Realm.Object & ThingsIKnowExist>
}

// I don't know where I'm typing incorrectly, but these functions exist
export type ThingsIKnowExist = {
    push(...items: T[]): number;
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