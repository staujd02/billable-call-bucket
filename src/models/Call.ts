const CallSchema  = {
    name: 'Call', 
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