import { Guid } from "guid-typescript";
import { Bill, NewBillbleCall } from "../../types/calls";
import { BillSchemaName } from "../models/Bill";
import useBills from "./useBills";
import usePersistentStorage from "./usePersistentStorage";

const useCalls = () => {

    const { getRealm } = usePersistentStorage();
    const { getOpenBill } = useBills();

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
        addBillableCall 
    }
}

export default useCalls;