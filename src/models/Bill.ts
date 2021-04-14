const BillSchemaName = 'Bill';
const BillSchema = {
    name: BillSchemaName,
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        isBilled: 'bool',
        isFinalized: 'bool',
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