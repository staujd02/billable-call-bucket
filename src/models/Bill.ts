export const Bill = {
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