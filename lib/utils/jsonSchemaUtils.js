'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2016/12/5.
 */
var assert = require('assert');
var jsf = require('json-schema-faker');
var tv4 = require('tv4');
var keys = require('lodash/keys');
var merge = require('lodash/merge');

function modifySchema(schema) {
    if (schema.type instanceof Array) {
        schema.type = schema.type.find(function (ele) {
            return ele !== 'null';
        });
    }

    if (schema.type === 'object') {
        if (!schema.hasOwnProperty('required')) {
            schema.required = [];
        }
        keys(schema.properties).forEach(function (k) {
            if (!schema.required.includes(k)) {
                schema.required.push(k);
            }
            modifySchema(schema.properties[k]);
        });
    } else if (schema.type === 'array') {
        modifySchema(schema.items);
    }
    return schema;
}

function modifyData(data, schema) {
    if (data instanceof Array) {
        data.forEach(function (ele) {
            return modifyData(ele, schema.items);
        });
    } else if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
        assert(schema && schema.properties);
        keys(data).forEach(function (k) {
            // 我们使得所有的属性都产生出来，在这里可以随机删除一些非必要产生的属性
            if (schema.required && !schema.required.includes(k)) {
                var ran = Math.random();
                if (ran > 0.8) {
                    delete data[k];
                }
            }
        });

        keys(data).forEach(function (k) {
            // 我们使所有可能为null的属性都产生出来，在这里可以随机产生一些null
            if (schema.properties[k].type instanceof Array) {
                assert(schema.properties[k].type.includes('null'));
                var ran = Math.random();
                if (ran > 0.8) {
                    data[k] = null;
                }
            }
        });

        keys(data).forEach(function (k) {
            // 使所有id项和对应的对象id对应
            if ((0, _typeof3.default)(data[k]) === 'object' && data[k] && data[k].hasOwnProperty('id') && data.hasOwnProperty(k + 'Id') && typeof data[k + 'Id'] === 'number') {
                data[k + 'Id'] = data[k].id;
            }
        });

        keys(data).forEach(function (k) {
            // 使所有id项和对应的对象id对应
            if ((0, _typeof3.default)(data[k]) === 'object' && data[k]) {
                modifyData(data[k], schema.properties[k]);
            }
        });
    } else {
        return;
    }
}

/**
 * 对数据进行schema检查
 * @param data
 * @param schema
 */
var validate = function validate(data, schema) {
    var valid = tv4.validateResult(data, schema);
    if (valid.error) {
        throw new Error('\u7ECF\u8FC7tailor\u540E\u7684\u6570\u636E\u4E0D\u6EE1\u8DB3jsonSchema\u7EA6\u675F\uFF0C\u9519\u8BEF\u662F' + valid.error);
    }
};

/**
 * 这个函数必须在JSF的基础上加一些定制，否则返回的数据太过随机
 * @param schema
 */
var generateDataBySchema = function generateDataBySchema(schema, tailor) {
    var schema2 = merge({}, schema);
    if (schema2.hasOwnProperty('$schema')) {
        delete schema2.$schema;
    }
    modifySchema(schema2);
    var data = jsf(schema2);
    modifyData(data, schema);

    if (tailor) {
        if ((typeof tailor === 'undefined' ? 'undefined' : (0, _typeof3.default)(tailor)) === 'object') {
            data = merge({}, data, tailor);
        } else if (typeof tailor === 'function') {
            data = tailor(data);
        } else {
            throw new Error('tailor参数必须是对象或函数类型');
        }

        validate(data, schema);
    }
    return data;
};

module.exports = {
    generateDataBySchema: generateDataBySchema,
    validate: validate
};