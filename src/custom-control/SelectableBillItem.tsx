import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Bill } from '../../types/calls';
import SelectableListItem from '../control/SelectableListItem';
import { formatDateWithoutTime } from '../service/formatter';

const SelectableBillItem = ({ bill, onOpenBillPress, onClosedBillPress }: SelectableBillItemProps) => {

    const { finalizedOn, calls } = bill;

    const callCount = `Calls: ${calls.length}`;
    const isDraft = finalizedOn == null;

    const onPress =
        isDraft
            ? onOpenBillPress
            : onClosedBillPress

    const billedMessage =
        isDraft
            ? "In Draft"
            : `Finalized On: ${formatDateWithoutTime(finalizedOn)}`;

    return <SelectableListItem
        onPress={onPress}
        titles={[billedMessage, callCount]}
        flexLayout={[2, 1]}
    />
}

type SelectableBillItemProps = {
    onOpenBillPress: (event: GestureResponderEvent) => void,
    onClosedBillPress: (event: GestureResponderEvent) => void,
    bill: Bill,
}

export default SelectableBillItem;