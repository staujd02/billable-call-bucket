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

    function enumerate<T>(result: IterableIterator<T & Realm.Object>, count: number): Array<T> {
        let limit = 0;
        const memoryList = [];
        for (const r of result) {
            memoryList.push(r);
            if (limit++ > count)
                break;
        }
        return memoryList;
    }


    useEffect(() => {
        loadRealm();
    }, [])

    return {
        realm,
        enumerate
    }
}

export default usePersistentStorage;