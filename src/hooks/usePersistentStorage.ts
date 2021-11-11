import Realm from 'realm';
import { Schema_2 } from '../models/Schema';
import { getRealmEncryptionKey } from '../service/keyGenerator';

const usePersistentStorage = () => {
    const getRealm = async () => {
        return await Realm.open({
            schema: Schema_2.schema,
            schemaVersion: Schema_2.version,
            path: "bill-me-repositiory",
            encryptionKey: await getRealmEncryptionKey()
        });
    }

    return {
        getRealm
    }
}

export default usePersistentStorage;