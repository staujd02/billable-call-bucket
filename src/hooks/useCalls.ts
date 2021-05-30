import { Guid } from "guid-typescript";
import { Bill, Call, CallDetailUpdate, NewBillbleCall } from "../../types/calls";
import { BillSchemaName } from "../models/Bill";
import { CallSchemaName } from "../models/Call";
import useBills from "./useBills";
import usePersistentStorage from "./usePersistentStorage";

const useCalls = () => {

    const { getRealm } = usePersistentStorage();
    const { getOpenBill } = useBills();

    const deleteCall = async (callId: string): Promise<void> => {
        const realm = (await getRealm());
        await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const call = realm.objectForPrimaryKey<Call>(CallSchemaName, callId);
                realm.delete(call);
                resolve();
            })
        });
    }

    const getCall = async (callId: string): Promise<Call> => {
        const realm = (await getRealm());
        return await new Promise<Call>(async (resolve, reject) => {
            realm.write(() => {
                const call = realm.objectForPrimaryKey<Call>(CallSchemaName, callId);
                resolve(call);
            })
        });
    }
    
    const updateCall = async ({ callPk, callReason, contactNotes }: CallDetailUpdate): Promise<void> => {
        const realm = (await getRealm());
        return await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const call = realm.objectForPrimaryKey<Call>(CallSchemaName, callPk);
                call.callReason = callReason;
                call.contactNotes = contactNotes;
                resolve();
            })
        });
    }

    const markCallAsBilled = async (callId: string): Promise<void> =>
        await setCallsBillStatus(getRealm, callId, true);

    const clearCallsAsBilledStatus = async (callId: string): Promise<void> =>
        await setCallsBillStatus(getRealm, callId, false);

    async function setCallsBillStatus(getRealm: () => Promise<Realm>, callId: string, status: boolean) {
        const realm = (await getRealm());
        return await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const call = realm.objectForPrimaryKey<Call>(CallSchemaName, callId);
                call.isBilled = status;
                resolve();
            });
        });
    }
    
    const addBillableCall = async (billableCall: NewBillbleCall) => {
        const openBill = await getOpenBill(billableCall.clientPk);
        const realm = (await getRealm());
        await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const bill = realm.objectForPrimaryKey<Bill>(
                    BillSchemaName,
                    openBill.pk.toString()
                );
                bill.calls.push({
                    ...billableCall,
                    pk: Guid.create().toString(),
                    isBilled: false,
                });
                resolve();
            })
        });
    }

    return {
        getCall,
        deleteCall,
        updateCall,
        addBillableCall,
        markCallAsBilled,
        clearCallsAsBilledStatus,
    }
}

export default useCalls;
