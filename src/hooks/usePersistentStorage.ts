import { useEffect, useState } from 'react';
import Realm from 'realm';
import { Schema_1 } from '../models/Schema';

const usePersistentStorage = () => {

    const [realm, setRealm] = useState<Realm>();

    async function loadRealm() {
        const openedRealm = await Realm.open(
            { 
                schema: Schema_1.schema,
                schemaVersion: Schema_1.version,
            }
        );
        setRealm(openedRealm);
    }

    useEffect(() => {
        loadRealm();
    }, [])

    return {
        realm
    }
}

export default usePersistentStorage;