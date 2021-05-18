import React, { useEffect } from 'react';
import { Call, CallLogType } from '../../types/calls';
import MultiActionButton from '../control/MultiActionButton';
import useContacts from '../hooks/useContacts';
import { formatPhoneNumber, formatContact, formatTimestamp, formatLogType } from '../service/formatter';

const MarkableBilledCall = ({ call, onGoToCallLinkedToClient, toggleCallBilledStatus }: MarkableBilledCallProps) => {

    const { loadContactByNumber, loadedContact } = useContacts();
    const { phoneNumber, timestamp, type, isBilled, pk } = call;

    useEffect(() => {
        loadContactByNumber(phoneNumber)
    }, []);

    const stamp = formatTimestamp(timestamp);
    const shortType = formatLogType(type as CallLogType);
    const title = loadedContact !== null
        ? formatContact(loadedContact)
        : formatPhoneNumber(phoneNumber);

    const mainTitle = `${title} ${shortType} ${stamp}`;
    const icon = isBilled ? 'check-square' : 'square';

    return (
        <MultiActionButton
            mainTitle={mainTitle}
            onPressMainAction={() => onGoToCallLinkedToClient(pk)}
            onPressSecondaryAction={() => toggleCallBilledStatus(pk)}
            secondaryTitle="invoice call"
            secondarySymbol={icon} />
    )
}

type MarkableBilledCallProps = {
    call: Call
    onGoToCallLinkedToClient: (pk: string) => void; 
    toggleCallBilledStatus: (pk: string) => void;
}

export default MarkableBilledCall;