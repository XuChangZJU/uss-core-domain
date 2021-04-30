'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var timeSlot = {
    morning: 1,
    afternoon: 2,
    evening: 3,
    allday: 4
};
var decodeTimeSlot = function decodeTimeSlot(timeSlot) {
    var t = {
        1: '上午',
        2: '下午',
        3: '晚上',
        4: '全天'
    };
    return t[timeSlot];
};

var _require2 = require('./trade'),
    category = _require2.category,
    decodeCategoryId = _require2.decodeCategoryId;

var type = {
    appointment: 1,
    register: 2
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.appointment, '预约'), (0, _defineProperty3.default)(_T, type.register, '挂号'), _T);
    return T[t];
};

var state = {
    normal: 301,
    late: 302,
    cancelled: 401,
    completed: 501,
    checkEnd: 502,
    absent: 601
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.normal, '待就诊'), (0, _defineProperty3.default)(_S, state.cancelled, '已取消'), (0, _defineProperty3.default)(_S, state.completed, '检查中'), (0, _defineProperty3.default)(_S, state.checkEnd, '已完成'), (0, _defineProperty3.default)(_S, state.late, '已过号'), (0, _defineProperty3.default)(_S, state.absent, '缺席'), _S);
    return S[s];
};

var action = (0, _assign2.default)({}, commonAction, {
    makeLate: 302,
    cancel: 401,
    regist: 501,
    checkEnd: 502,
    makeAbsent: 601
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.regist, '开始检查'), (0, _defineProperty3.default)(_A, action.checkEnd, '检查完成'), (0, _defineProperty3.default)(_A, action.cancel, '取消'), (0, _defineProperty3.default)(_A, action.makeLate, '过号'), (0, _defineProperty3.default)(_A, action.makeAbsent, '爽约'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.regist, [[state.normal, state.late], state.completed]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.checkEnd, [state.completed, state.checkEnd]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.cancel, [state.normal, state.cancelled]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.makeLate, [state.normal, state.late]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.makeAbsent, [[state.normal, state.late], state.absent]), _STATE_TRANS_MATRIX);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType,
    category: category,
    decodeCategoryId: decodeCategoryId,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};