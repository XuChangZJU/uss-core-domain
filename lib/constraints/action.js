'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$ROOT$name,
    _Roles$LOGGEDIN$name,
    _StateTransformMatrix,
    _StateTransformMatrix2,
    _arguments = arguments;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/8/31.
 * 本文件定义是公共有支付对象的状态变化矩阵
 */
var ErrorCode = require('../constants/errorCode');

var _require = require('../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../constants/action'),
    State = _require2.state,
    Relation = _require2.relation;

// 状态允许更新矩阵


var StateTransformMatrixForPaid = (_StateTransformMatrix = {}, (0, _defineProperty3.default)(_StateTransformMatrix, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, State.init, [State.unpaid, State.cancelled, State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.unpaid, [State.legal, State.cancelled, State.expired, State.cantPaid]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.legal, [State.completed, State.aborted, State.abandoned, State.aborting, State.abandoning]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.aborting, [State.aborted, State.completed]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.abandoning, [State.abandoned, State.completed]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.cantPaid, [State.legal, State.expired]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.sent, [State.completed]), _Roles$ROOT$name)), (0, _defineProperty3.default)(_StateTransformMatrix, Roles.LOGGEDIN.name, (_Roles$LOGGEDIN$name = {}, (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.init, [State.unpaid, State.cancelled]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.unpaid, [State.cancelled]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.legal, [State.aborted, State.aborting, State.abandoned, State.abandoning, State.sent]), (0, _defineProperty3.default)(_Roles$LOGGEDIN$name, State.sent, [State.completed, State.rejected]), _Roles$LOGGEDIN$name)), _StateTransformMatrix);

var StateTransformMatrixForGrant = (_StateTransformMatrix2 = {}, (0, _defineProperty3.default)(_StateTransformMatrix2, Roles.ROOT.name, (0, _defineProperty3.default)({}, State.init, [State.expired])), (0, _defineProperty3.default)(_StateTransformMatrix2, Roles.LOGGEDIN.name, (0, _defineProperty3.default)({}, State.init, [State.confirmed])), _StateTransformMatrix2);

var AllowEveryoneAuth = {
    allowEveryone: true
};

var AnyRelationAuth = {
    relation: 'any'
};

var OwnerRelationAuth = {
    relation: [Relation.owner]
};

var Ajv = require('ajv');
var ajv = new Ajv();
/**
 * 检查动作后项中actionData的schema
 * @param {*} schema jsonSchema对传入数据的描述
 */
var checkActionDataSchema = function checkActionDataSchema(schema) {
    return function (_ref) {
        var actionData = _ref.actionData;

        var valid = ajv.validate(schema, actionData);
        if (!valid) {
            return ajv.errors[0];
        }
        return true;
    };
};

var checkRowState = function checkRowState(states, entity, msg) {
    return function (_ref2) {
        var row = _ref2.row;
        var state = row.state;

        if (!states.includes(state)) {
            return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency, msg, {
                name: entity,
                operation: 'update',
                data: row
            });
        }
        return true;
    };
};

/**
 * 多个检查data的条件合并成为一个
 * @param {*} conditions 
 */
var makeCheckDataConditionFn = function makeCheckDataConditionFn(conditions) {
    return function () {
        var r = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(conditions), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var condition = _step.value;

                var result = condition.apply(null, _arguments);
                if (result instanceof Error) {
                    return result;
                } else if (result === false && r === true) {
                    r = false;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return r;
    };
};

module.exports = {
    StateTransformMatrixForPaid: StateTransformMatrixForPaid,
    StateTransformMatrixForGrant: StateTransformMatrixForGrant,

    AllowEveryoneAuth: AllowEveryoneAuth,
    OwnerRelationAuth: OwnerRelationAuth,
    AnyRelationAuth: AnyRelationAuth,

    checkActionDataSchema: checkActionDataSchema,
    checkRowState: checkRowState,
    makeCheckDataConditionFn: makeCheckDataConditionFn
};