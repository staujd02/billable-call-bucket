export const ClientSchema = {
    name: 'Client', 
    primaryKey: 'pk',
    properties: {
        pk: 'int',
        name: 'string',
        description: 'string',
        bills: {
            type: 'list',
            objectType: 'Bill',
        }
    }
}