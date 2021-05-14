'use strict';

var Ajv = require('ajv');
var ajv = new Ajv();

var schema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1
        },
        price: {
            type: 'object',
            properties: {
                currency: {
                    type: 'string',
                    enum: ['cny', 'dollor', 'jpy']
                },
                amount: {
                    'type': 'number',
                    'multipleOf': 0.1,
                    'maximum': 18
                }
            }
        }
    },
    required: ['id', 'price'],
    additionalProperties: false
};

var data = {
    id: 6,
    price: {
        currency: 'cny',
        amount: 12
    },
    aaa: 123
};

var start = Date.now();
var valid = ajv.validate(schema, data);
if (!valid) console.log(ajv.errors);
console.log('cost ' + (Date.now() - start) + ' ms');