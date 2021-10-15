import { Legal } from "../../types/calls";
import { LegalSchemaName } from "../models/Legal";
import usePersistentStorage from "./usePersistentStorage";

const legalKey = 1;

type MaybeLegal = Legal | undefined;

const useAuthState = () => {

    const { getRealm } = usePersistentStorage();

    const getAuthState = async (): Promise<MaybeLegal> => {
        const realm = (await getRealm());
        return await new Promise<MaybeLegal>(async (resolve, reject) => {
            realm.write(() => {
                const legal = realm.objectForPrimaryKey<MaybeLegal>(LegalSchemaName, legalKey);
                resolve(legal);
            })
        });
    }

    return {
        getAuthState,
    }
}

export default useAuthState;