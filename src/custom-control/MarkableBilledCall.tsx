import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import { Call, CallLogType } from '../../types/calls';
import FlexingMultiActionButton from '../control/FlexingMultiActionButton';
import useContacts from '../hooks/useContacts';
import { formatPhoneNumber, formatContact, formatLogType, formatDatePortionOfTimestamp } from '../service/formatter';

const MarkableBilledCall = ({ call, onGoToCallLinkedToClient, toggleCallBilledStatus }: MarkableBilledCallProps) => {

    const { loadContactByNumber, loadedContact } = useContacts();
    const { phoneNumber, timestamp, type, isBilled, pk } = call;

    useEffect(() => {
        loadContactByNumber(phoneNumber)
    }, []);

    const stamp = formatDatePortionOfTimestamp(timestamp);
    const shortType = formatLogType(type as CallLogType);
    const title = !!loadedContact
        ? formatContact(loadedContact)
        : formatPhoneNumber(phoneNumber);

    const icon = isBilled ? faCheckSquare : faSquare;

    return (
        <FlexingMultiActionButton 
            titles={[title || "---", shortType, stamp]}
            layout={[2, 1, 2]}
            onPressMainAction={() => onGoToCallLinkedToClient(pk)}
            onPressSecondaryAction={() => toggleCallBilledStatus(pk)}
            secondaryTitle="invoice call"
            secondarySymbol={icon}
        />
    )
}

type MarkableBilledCallProps = {
    call: Call
    onGoToCallLinkedToClient: (pk: string) => void; 
    toggleCallBilledStatus: (pk: string) => void;
}

export default MarkableBilledCall;