import { Legal } from "../../types/calls";
import { LegalSchemaName } from "../models/Legal";
import usePersistentStorage from "./usePersistentStorage";

const legalKey = 1;

type MaybeLegal = Legal | undefined;

const useRegistration = () => {

    const { getRealm } = usePersistentStorage();

    const getRegistrationState = async (): Promise<MaybeLegal> => {
        const realm = (await getRealm());
        return await new Promise<MaybeLegal>(async (resolve, reject) => {
            realm.write(() => {
                const legal = realm.objectForPrimaryKey<MaybeLegal>(LegalSchemaName, legalKey);
                resolve(legal);
            })
        });
    }

    const createRegistrationState = async (): Promise<void> => {
        const realm = (await getRealm());
        return await new Promise<void>(async (resolve, reject) => {
            realm.write(() => {
                realm.create<Legal>(LegalSchemaName, {
                    acceptanceTimestamp: new Date(Date.now()),
                    accepted: true,
                    pk: legalKey,
                });
                resolve();
            })
        });
    }

    return {
        getRegistrationState,
        createRegistrationState,
    }
}

export default useRegistration;