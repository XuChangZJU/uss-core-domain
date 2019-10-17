'use strict';

var _report;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/9/20.
 */
var _require = require('../../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../../constants/nezha/report'),
    ReportAction = _require2.action,
    ReportRelation = _require2.relation,
    ReportState = _require2.state,
    REPORT_CONSTANTS = _require2.CONSTANTS,
    REPORT_STATE_TRAN_MATRIX = _require2.STATE_TRAN_MATRIX;

var ErrorCode = require('../../constants/nezha/errorCode');

var _require3 = require('../../constants/action'),
    COMMON_STATE_TRAN_MATRIX = _require3.COMMON_STATE_TRAN_MATRIX;

function genOwnerOrFactoryOwner(checkRow) {
    return {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                attr: 'machine.factory', // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [ReportRelation.owner] // 如果没有relations，则任何关系都可以
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref) {
                    var user = _ref.user,
                        row = _ref.row;
                    return checkRow({ user: user, row: row });
                }
            }]
        }, {
            '#relation': { // 表示现有对象与user的关系
                attr: 'id', // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [ReportRelation.owner] // 如果没有relations，则任何关系都可以
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;
                    return checkRow({ user: user, row: row });
                }
            }]
        }]
    };
}

function genWorker(checkRow) {
    return {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                attr: 'id', // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [ReportRelation.worker] // 如果没有relations，则任何关系都可以
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;
                    return checkRow({ user: user, row: row });
                }
            }]
        }]
    };
}

var AUTH_MATRIX = {
    report: (_report = {}, _defineProperty(_report, ReportAction.confirm, {
        auths: [{
            '#relation': { // 表示现有对象与user的关系
                attr: 'machine.factory', // 这里的attr指对象（agency)中的属性，通过Schema反查找，如果没有则是指自身，即使用id属性
                relations: [ReportRelation.owner] // 如果没有relations，则任何关系都可以
            },
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之前是AND的关系
            {
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;

                    return row.state === ReportState.init;
                }
            }]
        }]
    }), _defineProperty(_report, ReportAction.accept, {
        auths: [{
            '#exists': [{
                relation: 'userCertificate',
                condition: function condition(_ref5) {
                    var user = _ref5.user;

                    return {
                        userId: user.id
                    };
                }
            }],
            '#data': [// 表示对现有对象或者用户的数据有要求，可以有多项，每项之间是AND的关系
            {
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return row.state === ReportState.delivered;
                }
            }]
        }]
    }), _defineProperty(_report, ReportAction.deliverAgain, genOwnerOrFactoryOwner(function (_ref7) {
        var user = _ref7.user,
            row = _ref7.row;

        return row._createAt_ < Date.now() - REPORT_CONSTANTS.allowDeliverGap && row.state === ReportState.accepted;
    })), _defineProperty(_report, ReportAction.giveUp, genWorker(function (_ref8) {
        var user = _ref8.user,
            row = _ref8.row;

        return row.state === ReportState.accepted;
    })), _defineProperty(_report, ReportAction.cancel, genOwnerOrFactoryOwner(function (_ref9) {
        var user = _ref9.user,
            row = _ref9.row;

        return row._createAt_ < Date.now() - REPORT_CONSTANTS.allowDeliverGap && row.state === ReportState.accepted || [ReportState.init, ReportState.delivered].includes(row.state);
    })), _defineProperty(_report, ReportAction.startRepairing, genWorker(function (_ref10) {
        var user = _ref10.user,
            row = _ref10.row;

        return [ReportState.accepted].includes(row.state);
    })), _defineProperty(_report, ReportAction.endRepairing, genOwnerOrFactoryOwner(function (_ref11) {
        var user = _ref11.user,
            row = _ref11.row;

        return [ReportState.inRepairing, ReportState.inRedoing].includes(row.state);
    })), _defineProperty(_report, ReportAction.askForRestart, genOwnerOrFactoryOwner(function (_ref12) {
        var user = _ref12.user,
            row = _ref12.row;

        return row.state === ReportState.done;
    })), _defineProperty(_report, ReportAction.restart, genWorker(function (_ref13) {
        var user = _ref13.user,
            row = _ref13.row;

        return row.state === ReportState.askingForRestart;
    })), _defineProperty(_report, ReportAction.surrender, genOwnerOrFactoryOwner(function (_ref14) {
        var user = _ref14.user,
            row = _ref14.row;

        return [ReportState.inRepairing, ReportState.inRedoing].includes(row.state);
    })), _report)
};

var STATE_TRAN_MATRIX = {
    certificate: COMMON_STATE_TRAN_MATRIX,
    report: REPORT_STATE_TRAN_MATRIX
};

module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};