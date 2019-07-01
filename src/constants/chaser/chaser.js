/**
 * Created by Xc on 2019/7/1.
 */
const Type = {
    cmd: 5,
    responseOk: 11,
    responseFailure: 12,
    reportEvt: 21,
};

const Command = {
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
    testSetLed: 201,
};

const ErrorCode = {
    wrongParity: 1,
    wrongSize: 2,
    unrecognizedType: 3,
    unrecognizedCmd: 4,
    multiPacketOvertime: 5,
    dataUnexisted: 6,
    timestampIllegal: 7,
};

const ChargeSource = {
    server: 1,
    coin: 2,
    rfid: 3,
};

const ChargeCode = {
    complete: 1,
    killed: 2,

    overtime: 61,
    busy: 62,
};

module.exports = {
    Type,
    Command,
    ErrorCode,
    ChargeSource,
    ChargeCode,
};
