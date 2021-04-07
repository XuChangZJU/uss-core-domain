'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = (0, _assign2.default)({}, commonRelation, {
    labeler: 201,
    labelee: 202
});

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, (0, _defineProperty3.default)(_R, relation.labeler, '打标签者'), (0, _defineProperty3.default)(_R, relation.labelee, '被打标签者'), _R);
    return R[r] || decodeCommonRelation(r);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation
};