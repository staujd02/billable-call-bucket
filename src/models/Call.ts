const CallSchemaName = 'Call';
const CallSchema = {
    name: CallSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        callReason: 'string',
        contactNotes: 'string',
        phoneNumber: 'string',
        duration: 'int',
        timestamp: 'string',
        dateTime: 'date',
        type: 'string',
    }
}

export default CallSchema;
export {
    CallSchemaName
}