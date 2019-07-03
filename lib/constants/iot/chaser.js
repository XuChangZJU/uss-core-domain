"use strict";

/**
 * Created by Xc on 2019/7/1.
 */
var Type = {
    cmd: 5,
    responseOk: 11,
    responseFailure: 12,
    reportEvt: 21
};

var Command = {
    confirmTimestamp: 1,
    getEvtAndTimestamp: 5,

    setConfig: 10,
    getConfig: 11,
    getSpec: 12,

    startCharge: 21,
    stopCharge: 22,

    chargeStarted: 161,
    chargeRejected: 162,
    chargeStopped: 163,

    testSetRelay: 200,
    testSetLed: 201
};

var ErrorCode = {
    wrongParity: 1,
    wrongSize: 2,
    unrecognizedType: 3,
    unrecognizedCmd: 4,
    multiPacketOvertime: 5,
    dataUnexisted: 6,
    timestampIllegal: 7
};

var ChargeSource = {
    server: 1,
    coin: 2,
    rfid: 3
};

var ChargeCode = {
    complete: 1,
    killed: 2,

    overtime: 61,
    busy: 62
};

var CommandState = {
    init: 1, // 未发送
    send: 2, // 已发送
    done: 3 // 已处理掉
};

var populateCommand = function populateCommand(type, command, data) {
    // todo 这里要发送的数据应该以什么形式传递，还要看luat的socket的格式
};

module.exports = {
    Type: Type,
    Command: Command,
    ErrorCode: ErrorCode,
    ChargeSource: ChargeSource,
    ChargeCode: ChargeCode,
    CommandState: CommandState,
    populateCommand: populateCommand
};