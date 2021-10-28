const LegalSchemaName = 'Legal';
const LegalSchema = {
    name: LegalSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        passKey: 'string',
        userName: 'string',
        acceptanceTimestamp: 'date',
        authenticationMethod: 'string',
        emailVerified: 'bool',
    }
}

export default LegalSchema;
export {
    LegalSchemaName
}