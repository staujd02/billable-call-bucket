import AsyncStorage from '@react-native-async-storage/async-storage';
import Realm from 'realm';
import { Schema_2 } from '../models/Schema';

const usePersistentStorage = () => {

    const keyStoreValue = 'encrypt-key';

    const getKey = async () => {
        let key = await AsyncStorage.getItem(keyStoreValue);
        let encrypt: Uint8Array = new Uint8Array(key ? parseInt(key) : Date.now());
        if (!key)
            await AsyncStorage.setItem(keyStoreValue, encrypt.toString());
        return encrypt;
    }

    const getRealm = async () => {
        return await Realm.open({
            schema: Schema_2.schema,
            schemaVersion: Schema_2.version,
            path: "bill-me-repositiory",
            encryptionKey: await getKey()
        });
    }

    return {
        getRealm
    }
}

export default usePersistentStorage;