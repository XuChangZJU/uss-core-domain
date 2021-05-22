const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        },
        price: {
            type: 'object',
            properties: {
                currency: {
                    type: 'string',
                    enum: [
                        'cny',
                        'dollor',
                        'jpy',
                    ],
                },
                amount: {
                    'type': 'number',
                    'multipleOf': 0.1,
                    'maximum': 18,
                },
            },
        },
    },
    required: ['id', 'price'],
    additionalProperties: false,
};

const data = {
    id: 6,
    price: {
        currency: 'cny',
        amount: 12,
    },
};

let start = Date.now();
const valid = ajv.validate(schema, data);
if (!valid) console.log(ajv.errors);
console.log(`cost ${Date.now() - start} ms`);

const fn = ajv.compile(schema);
start = Date.now();
const valid2 = fn(data);
if (!valid2) console.log(ajv.errors);
console.log(`compiled cost ${Date.now() - start} ms`);