const ClientSchemaName = 'Client';
const ClientSchema = {
    name: ClientSchemaName,
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

export default ClientSchema;
export {
    ClientSchemaName
}