import { Guid } from "guid-typescript";
import { Bill, Client } from "../../types/calls";
import { BillSchemaName } from "../models/Bill";
import { ClientSchemaName } from "../models/Client";
import usePersistentStorage from "./usePersistentStorage";

const useBills = () => {

    const { getRealm } = usePersistentStorage();

    const getBill = async (billId: string): Promise<Bill> => {
        const realm = (await getRealm());
        return await new Promise<Bill>(async (resolve, reject) => {
            realm.write(() => {
                const bill = realm.objectForPrimaryKey<Bill>(BillSchemaName, billId);
                resolve(bill);
            })
        });
    }

    const getSortedClientBills = async (clientId: string): Promise<Array<Bill>> => {
        const realm = (await getRealm());
        return await new Promise<Array<Bill>>(async (resolve, reject) => {
            realm.write(() => {
                const client = realm.objectForPrimaryKey<Client>(ClientSchemaName, clientId)
                resolve(client.bills.sorted("finalizedOn", true));
            })
        });
    }

    const markBillAsFinalized = async (billId: string) => {
        const realm = (await getRealm());
        return await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                const bill = realm.objectForPrimaryKey<Bill>(BillSchemaName, billId);
                bill.finalizedOn = new Date();
                resolve();
            })
        });
    }

    const getOpenBill = async (clientId: string) => {
        const realm = (await getRealm());
        return await new Promise<Bill>(async (resolve, reject) => {
            realm.write(() => {
                const client = realm.objectForPrimaryKey<Client>(ClientSchemaName, clientId.toString());
                const openBill = client.bills.find(b => b.finalizedOn === null);
                if (!openBill) {
                    const newOpenBill = createNewBill();
                    client.bills.push(newOpenBill);
                    resolve(newOpenBill);
                }
                resolve(openBill);
            })
        });
    }

    const createNewBill = (): Bill => {
        return {
            pk: Guid.create().toString(),
            finalizedOn: null,
            calls: [],
        };
    }

    return {
        getBill,
        getOpenBill,
        markBillAsFinalized,
        getSortedClientBills,
    }
}

export default useBills;
