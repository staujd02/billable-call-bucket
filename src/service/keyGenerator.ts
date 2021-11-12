import { generateSecureRandom } from 'react-native-securerandom';
import * as Keychain from 'react-native-keychain';

const convertKeyStringToBuffer: (key: string) => Uint8Array = (key: string) =>
    Uint8Array.from(Array.from(key).map(letter => letter.charCodeAt(0)));

const convertKeyBufferToString: (rawKey: Uint8Array) => string = (rawKey: Uint8Array) =>
    Array.from(rawKey).map(byte => String.fromCharCode(byte)).join('');

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