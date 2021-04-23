import { useEffect, useState } from 'react';
import Realm from 'realm';
import { Schema_1 } from '../models/Schema';

const usePersistentStorage = () => {

    const getRealm = async () => await Realm.open(
        {
            schema: Schema_1.schema,
            schemaVersion: Schema_1.version,
        }
    );

    return {
        getRealm
    }
}

export default usePersistentStorage;