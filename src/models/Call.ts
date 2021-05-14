const CallSchemaName = 'Call';
const CallSchema = {
    name: CallSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'string',
        isBilled: 'bool',
        callReason: 'string',
        contactNotes: 'string',
        phoneNumber: 'string',
        duration: 'int',
        timestamp: 'string',
        type: 'string',
    }
}

export default CallSchema;
export {
    CallSchemaName
}