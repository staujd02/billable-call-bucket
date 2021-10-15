const LegalSchemaName = 'Legal';
const LegalSchema = {
    name: LegalSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        acceptanceTimestamp: 'date',
        authenticationMethod: 'string',
    }
}

export default LegalSchema;
export {
    LegalSchemaName
}