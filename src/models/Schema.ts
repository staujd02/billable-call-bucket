import BillSchema from '../models/Bill';
import CallSchema from '../models/Call';
import ClientSchema from '../models/Client';
import LegalSchema from '../models/Legal';

const Schema_1 = {
    version: 1,
    schema: [CallSchema, BillSchema, ClientSchema]
}

const Schema_2 = {
    version: 2,
    schema: [CallSchema, BillSchema, ClientSchema, LegalSchema]
}

export {
    Schema_1,
    Schema_2
}