const LegalSchemaName = 'Legal';
const LegalSchema = {
    name: LegalSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        accepted: 'bool',
        acceptanceTimestamp: 'date',
    }
}

export default LegalSchema;
export {
    LegalSchemaName
}