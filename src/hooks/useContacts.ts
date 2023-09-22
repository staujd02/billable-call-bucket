import { requestContactPermission } from "../service/permissionRequest";
import Contacts, { Contact } from 'react-native-contacts';
import { useState } from "react";

const useContacts = () => {
    
    const [loadedContact, setLoadedContact] = useState<Contact | null>();
    const [matchingContacts, setMatchingContacts] = useState<Contact[]>();

    async function loadContactByNumber(number: string) : Promise<void> {
        if ((await requestContactPermission())){
            const contacts = await Contacts.getContactsByPhoneNumber(number);
            if(singleMatchingContactExist(contacts))
                setLoadedContact(contacts[0])
            else
                setLoadedContact(null);
            if(multipleMatchingContactExist(contacts))
                setMatchingContacts(contacts)
        }
    }

    function singleMatchingContactExist(matchingContacts: Array<Contact>): boolean {
        return matchingContacts !== null && matchingContacts.length === 1;
    }
    
    function multipleMatchingContactExist(matchingContacts: Array<Contact>): boolean {
        return matchingContacts !== null && matchingContacts.length > 0;
    }

    return {
        loadContactByNumber,
        loadedContact,
        matchingContacts
    }
}

export default useContacts;