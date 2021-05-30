import React from "react";
import { Call } from "../../types/calls";
import DoubleTextLayout from "./DoubleTextLayout";
import MutableCallDetails from "./MutableCallDetails";
import StaticCallDetails from "./StaticCallDetails";

const CallDetails = ({ call }: CallDetailsProps) => {
  return (
    <>
      <StaticCallDetails call={call} />
      <MutableCallDetails
        contactNotes={call.contactNotes}
        callReason={call.callReason} />
    </>
  );
}

type CallDetailsProps = {
  call: Call
}

export default CallDetails;