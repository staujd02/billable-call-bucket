import BillSchema from '../models/Bill';
import CallSchema from '../models/Call';
import ClientSchema from '../models/Client';

const Schema_1 = {
    version: 1,
    schema: [CallSchema, BillSchema, ClientSchema] 
} 

export {
    Schema_1 
}