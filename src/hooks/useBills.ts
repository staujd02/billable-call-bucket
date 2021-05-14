import { Guid } from "guid-typescript";
import { Bill, Client } from "../../types/calls";
import { ClientSchemaName } from "../models/Client";
import usePersistentStorage from "./usePersistentStorage";

const useBills = () => {

    const { getRealm } = usePersistentStorage();

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
        getOpenBill
    }
}

export default useBills;
