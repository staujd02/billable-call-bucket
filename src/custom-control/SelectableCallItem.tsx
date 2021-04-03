import React, { useEffect } from 'react';
import { GestureResponderEvent } from 'react-native';
import { CallLog } from '../../types/calls';

import SelectableListItem from '../control/SelectableListItem';
import useContacts from '../hooks/useContacts';
import { formatPhoneNumber, formatContact, formatTimestamp, formatLogType  } from '../service/formatter';

const SelectableCallItem = ({ callLog, onPress }: SelectableCallItemProps) => {

    const { loadContactByNumber, loadedContact } = useContacts();
    
    useEffect(() => {
        loadContactByNumber(callLog.phoneNumber)
    }, []);

    const callDirection = formatLogType(callLog.type);
    const stamp = formatTimestamp(callLog.timestamp);

    const title = loadedContact !== null
        ? formatContact(loadedContact)
        : formatPhoneNumber(callLog.phoneNumber);

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