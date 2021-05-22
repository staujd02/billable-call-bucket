import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Bill } from '../../types/calls';
import SelectableListItem from '../control/SelectableListItem';
import { formatDate } from '../service/formatter';

const SelectableBillItem = ({ bill, onOpenBillPress, onClosedBillPress }: SelectableBillItemProps) => {

    const { finalizedOn } = bill;

    return finalizedOn == null
        ? <SelectableListItem
            onPress={onOpenBillPress}
            titles={["Bill", "In Draft"]}
            flexLayout={[1, 2]}
        />
        : <SelectableListItem
            onPress={onClosedBillPress}
            titles={["Bill", `Finalized On: ${formatDate(finalizedOn)}`]}
            flexLayout={[1, 2]}
        />
}

type SelectableBillItemProps = {
    onOpenBillPress: (event: GestureResponderEvent) => void,
    onClosedBillPress: (event: GestureResponderEvent) => void,
    bill: Bill,
}

export default SelectableBillItem;