import React, { useEffect } from 'react';
import { GestureResponderEvent, View } from 'react-native';
import { Call, CallLogType } from '../../types/calls';

import SelectableListItem from '../control/SelectableListItem';
import useContacts from '../hooks/useContacts';
import { formatPhoneNumber, formatContact, formatTimestamp, formatLogType } from '../service/formatter';

const SelectableBilledCallItem = ({ call, onPress }: SelectableBillCallItemProps) => {

    const { loadContactByNumber, loadedContact } = useContacts();

    useEffect(() => {
        loadContactByNumber(call.phoneNumber)
    }, []);

    const callDirection = formatLogType(call.type as CallLogType);
    const stamp = formatTimestamp(call.timestamp);

    const title = !!loadedContact
        ? formatContact(loadedContact)
        : formatPhoneNumber(call.phoneNumber);

    return (
        <SelectableListItem
            onPress={onPress}
            titles={[title || "---", callDirection, stamp]}
            flexLayout={[2, 1, 2]}
        />
    )
}

type SelectableBillCallItemProps = {
    onPress: (event: GestureResponderEvent) => void,
    call: Call,
}

export default SelectableBilledCallItem;