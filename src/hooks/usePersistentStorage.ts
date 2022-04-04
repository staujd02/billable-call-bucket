import Realm from 'realm';
import { Schema_1 } from '../models/Schema';
import { getRealmEncryptionKey } from '../service/keyGenerator';

const usePersistentStorage = () => {
    const getRealm = async () => {
        return await Realm.open({
            schema: Schema_1.schema,
            schemaVersion: Schema_1.version,
            path: "bill-me-repositiory",
            encryptionKey: await getRealmEncryptionKey()
        });
    }

    return {
        getRealm
    }
}

export default usePersistentStorage;