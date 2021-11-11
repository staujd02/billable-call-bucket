import { generateSecureRandom } from 'react-native-securerandom';
import * as Keychain from 'react-native-keychain';

const convertKeyStringToBuffer: (key: string) => Uint8Array = (key: string) =>
    new Uint8Array(Buffer.from(key, 'base64').buffer);

const convertKeyBufferToString: (rawKey: Uint8Array) => string = (rawKey: Uint8Array) =>
    Buffer.from(rawKey).toString('base64');

const getRealmEncryptionKey: () => Promise<Uint8Array> = async () => {
    const username = 'dont-care';

    const credentials = await Keychain.getGenericPassword();
    if (credentials)
        return await convertKeyStringToBuffer(credentials.password);
        
    const newKey = await generateSecureRandom(64);
    await Keychain.setGenericPassword(username, convertKeyBufferToString(newKey));
    return newKey;
};

export {
    getRealmEncryptionKey
}