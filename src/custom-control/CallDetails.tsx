import React, { useEffect } from "react";
import { Call, CallLogType } from "../../types/calls";
import DoubleTextLayout from "./DoubleTextLayout";
import useContacts from '../hooks/useContacts';
 import { formatContact, formatHoursMinutesSeconds, formatLogType, formatPhoneNumber, formatTimestamp } from '../service/formatter';

const CallDetails = ({ call }: CallDetailsProps) => {
  
  const { loadContactByNumber, loadedContact } = useContacts();

  useEffect(() => {
    if(call !== null)
      loadContactByNumber(call.phoneNumber)
  }, [call]);

  const formattedDuration = formatHoursMinutesSeconds(call.duration);
  const stamp = formatTimestamp(call.timestamp);

  const title = loadedContact !== null
    ? formatContact(loadedContact)
    : formatPhoneNumber(call.phoneNumber);

    return (
        <>
            <DoubleTextLayout label="Contact:" content={title} />
            <DoubleTextLayout label="When:" content={stamp} />
            <DoubleTextLayout label="Duration:" content={formattedDuration} />
            <DoubleTextLayout label="Call Direction:" content={call.type} />
            <DoubleTextLayout label="Contact Notes:" content={call.contactNotes} />
            <DoubleTextLayout label="Call Notes:" content={call.callReason} />
        </>
    );
}

type CallDetailsProps = {
    call: Call
}

export default CallDetails;