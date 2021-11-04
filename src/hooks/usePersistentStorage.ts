import Realm from 'realm';
import { Schema_2 } from '../models/Schema';

const usePersistentStorage = () => {

    // store key
    // and get key value here: https://www.npmjs.com/package/react-native-shared-preferences

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