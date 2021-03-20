import React from 'react';
import SelectableListItem from '../control/SelectableListItem';

const SelectableCallItem = ({ callLog, onPress }) => {
    return (
        <SelectableListItem onPress={onPress} title={callLog.name} />
    )
}

export default SelectableCallItem;