const LegalSchemaName = 'Legal';
const LegalSchema = {
    name: LegalSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        acceptanceTimestamp: 'date',
        accepted: 'bool',
        version: 'int',
    }
}

export default LegalSchema;
export {
    LegalSchemaName
}