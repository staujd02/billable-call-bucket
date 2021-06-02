import Realm from 'realm';
import { Schema_1 } from '../models/Schema';

const usePersistentStorage = () => {

    const getRealm = async () => await Realm.open(
        {
            schema: Schema_1.schema,
            schemaVersion: Schema_1.version,
            path: "bill-me-repositiory"
        }
    );

    return {
        getRealm
    }
}

export default usePersistentStorage;