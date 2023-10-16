export type CallLogType = "OUTGOING" | "INCOMING" | "MISSED" | "UNKNOWN";

export type CallLog = {
    phoneNumber: string,
    duration: number,
    name: string,
    timestamp: string,
    dateTime: string,
    type: CallLogType
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
    bills: Realm.Results<Bill & Realm.Object & ThingsIKnowExist<Bill>>
}

export type Bill = {
    pk: string,
    finalizedOn: Date,
    calls: Realm.Results<Call & Realm.Object & ThingsIKnowExist<Call>>
}

export type LegalInfo = {
    acceptanceTimestamp: Date,
    accepted: boolean,
    version: int
}

export type Legal = {
    pk: number
} & LegalInfo

// I don't know where I'm typing incorrectly, but these functions exist
export type ThingsIKnowExist<T> = {
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