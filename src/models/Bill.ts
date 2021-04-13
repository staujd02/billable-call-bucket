const BillSchema = {
    name: 'Bill', 
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