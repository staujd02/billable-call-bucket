import React from "react";
import DoubleTextLayout from "./DoubleTextLayout";

const MutableCallDetails = ({ contactNotes, callReason }: MutableCallDetailsProps) => {
  return (
    <>
      <DoubleTextLayout label="Contact Notes:" content={contactNotes} />
      <DoubleTextLayout label="Call Notes:" content={callReason} />
    </>
  );
}

type MutableCallDetailsProps = {
  callReason: string,
  contactNotes: string,
}

export default MutableCallDetails;