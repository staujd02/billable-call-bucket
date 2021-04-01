import React, { useEffect, useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Contact } from 'react-native-contacts';
import { CallLog } from '../../types/calls';

import SelectableListItem from '../control/SelectableListItem';
import useContacts from '../hooks/useContacts';
import { formatPhoneNumber } from '../service/formatter';

const SelectableCallItem = ({ callLog, onPress }: SelectableCallItemProps) => {

    const { getContactByNumber } = useContacts();

    const [matchingContacts, setContactName] = useState<Array<Contact>>(null);

    const formatContact = (contact: Contact): string =>
        `${contact.givenName} ${contact.familyName}`;
    const matchingContactExist = (): boolean =>
        matchingContacts !== null && matchingContacts.length !== 0;
    const callDirection = callLog.type === "INCOMING" ? 'IN' : 'OUT';

    const fetchContact = async (phoneNumber) =>
        setContactName(await getContactByNumber(phoneNumber));

    useEffect(() => {
        fetchContact(callLog.phoneNumber)
    }, []);

    const title = matchingContactExist()
        ? formatContact(matchingContacts[0])
        : formatPhoneNumber(callLog.phoneNumber);

    const dateObject = new Date(parseInt(callLog.timestamp));
    const dateString = `${dateObject.getDay()}/${dateObject.getMonth()}/${dateObject.getFullYear()}`;
    const timeString = `${dateObject.getHours()}:${dateObject.getMinutes()}${dateObject.getMinutes() < 10 ? "0" : ""}`;
    const stamp = `${dateString} ${timeString}`;

    return (
        <SelectableListItem
            onPress={onPress}
            titles={[title, callDirection, stamp]}
            flexLayout={[2, 1, 2]}
        />
    )
}

type SelectableCallItemProps = {
    onPress: (event: GestureResponderEvent) => void,
    callLog: CallLog,
}

export default SelectableCallItem;