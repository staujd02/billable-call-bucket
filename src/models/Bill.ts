const BillSchemaName = 'Bill';
const BillSchema = {
    name: BillSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'string',
        finalizedOn: 'date?',
        calls: {
            type: 'list',
            objectType: 'Call',
        }
    }
}

export default BillSchema;
export {
    BillSchemaName
}