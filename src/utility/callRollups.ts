import { formatTimestamp } from "../service/formatter";
import { Bill, Call, ThingsIKnowExist } from "../../types/calls";

const DEFAULT_PLACEHOLDER = "--";

type CallArray = (Call & Realm.Object & ThingsIKnowExist)[];
type Reducer = (previousValue: Call & Realm.Object & ThingsIKnowExist, currentValue: Call & Realm.Object & ThingsIKnowExist, currentIndex: number, array: CallArray) => Call & Realm.Object & ThingsIKnowExist;

function findEarliestCallDate(calls: CallArray): string {
    return safelyReduceToDesiredTimestamp(calls, earliestCallComparsion());
}

function findLatestCallDate(calls: CallArray): string {
    return safelyReduceToDesiredTimestamp(calls, latestCallComparsion());
}

function safelyReduceToDesiredTimestamp(calls: CallArray, reducer: Reducer): string {
    if (callsExists(calls)) {
        return exactlyOneCall(calls)
            ? formatTimestamp(getFirstCall(calls).timestamp)
            : formatTimestamp(findCall(calls, reducer).timestamp)
    }
    return DEFAULT_PLACEHOLDER;
}

function findCall(calls: CallArray, reducer: Reducer) {
    return calls.reduce(reducer, getFirstCall(calls));
}

function earliestCallComparsion(): Reducer {
    return (prev, cur) => parseInt(cur.timestamp) > parseInt(prev.timestamp) ? prev : cur;
}

function latestCallComparsion(): Reducer {
    return (prev, cur) => parseInt(cur.timestamp) < parseInt(prev.timestamp) ? prev : cur;
}

function getFirstCall(bill: CallArray): Call {
    return bill[0];
}

function callsExists(calls: CallArray) {
    return calls && calls.length > 0;
}

function exactlyOneCall(calls: CallArray) {
    return calls.length === 1;
}

function sumCallDuration(bill: Bill): number {
    if (bill)
        return bill.calls.reduce((prev, cur) => cur.duration + prev, 0);
    return 0;
}

function countCalls(bill: Bill): number {
    return bill?.calls.length || 0;
}

export {
    countCalls,
    sumCallDuration,
    findLatestCallDate,
    findEarliestCallDate,
}