import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { CallLog } from '../../types/calls';

import SelectableListItem from '../control/SelectableListItem';

const SelectableCallItem = ({ callLog, onPress }: SelectableCallItemProps) => {
    const title = callLog.name !== null
        ? callLog.name
        : callLog.phoneNumber;
    const unicodeSymbolForCallDirection = callLog.type === "INCOMING"
        ? '\u2199'
        : '\u2197';
    return (
        <SelectableListItem onPress={onPress} title={`${title} ${callLog.duration} ${unicodeSymbolForCallDirection}`} />
    )
}

type SelectableCallItemProps = {
    onPress: (event: GestureResponderEvent) => void,
    callLog: CallLog,
}

export default SelectableCallItem;