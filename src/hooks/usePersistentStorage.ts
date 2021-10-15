import Realm from 'realm';
import { Schema_2 } from '../models/Schema';

const usePersistentStorage = () => {

    const getRealm = async () => await Realm.open(
        {
            schema: Schema_2.schema,
            schemaVersion: Schema_2.version,
            path: "bill-me-repositiory"
        }
    );

    return {
        getRealm
    }
}

export default usePersistentStorage;