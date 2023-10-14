const LegalSchemaName = 'Legal';
const LegalSchema = {
    name: LegalSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        acceptanceTimestamp: 'date',
        termsAccepted: 'bool',
    }
}

export default LegalSchema;
export {
    LegalSchemaName
}