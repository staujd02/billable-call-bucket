import { requestContactPermission } from "../service/permissionRequest";
import Contacts, { Contact } from 'react-native-contacts';

const useContacts = () => {
    async function getContactByNumber(number) : Promise<Array<Contact>> {
        if ((await requestContactPermission()))
            return await Contacts.getContactsByPhoneNumber(number);
        return [];
    }

    return {
        getContactByNumber
    }
}

export default useContacts;