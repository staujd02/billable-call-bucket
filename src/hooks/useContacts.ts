import { requestContactPermission } from "../service/permissionRequest";
import Contacts, { Contact } from 'react-native-contacts';
import { useState } from "react";

const useContacts = () => {
    
    const [loadedContact, setLoadedContact] = useState<Contact>(null);

    async function loadContactByNumber(number: string) : Promise<void> {
        if ((await requestContactPermission())){
            const contacts = await Contacts.getContactsByPhoneNumber(number);
            if(matchingContactExist(contacts))
                setLoadedContact(contacts[0])
        }
    }

    function matchingContactExist (matchingContacts: Array<Contact>): boolean {
        return matchingContacts !== null && matchingContacts.length !== 0;
    }

    return {
        loadContactByNumber,
        loadedContact
    }
}

export default useContacts;