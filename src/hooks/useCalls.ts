import { Guid } from "guid-typescript";
import { Bill, Call, NewBillbleCall } from "../../types/calls";
import { BillSchemaName } from "../models/Bill";
import { CallSchemaName } from "../models/Call";
import useBills from "./useBills";
import usePersistentStorage from "./usePersistentStorage";

const useCalls = () => {

    const { getRealm } = usePersistentStorage();
    const { getOpenBill } = useBills();

    const getCall = async (callId: string): Promise<Call> => {
        const realm = (await getRealm());
        return await new Promise<Call>(async (resolve, reject) => {
            realm.write(() => {
                const call = realm.objectForPrimaryKey<Call>(CallSchemaName, callId);
                resolve(call);
            })
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
        addBillableCall,
        getCall,
    }
}

export default useCalls;