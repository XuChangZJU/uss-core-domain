const {
    action: commonAction,
    transportAction,
    decodeAction: decodeCommonAction,
    decodeTransportAction,
    decodeTransportState,
    state,
    decodeState: decodeCommonState,
} = require('../action');

const action = Object.assign(
    {}, commonAction, transportAction,
);

const decodeAction = (a) => {

    return decodeCommonAction(a) || decodeTransportAction(a);
};

const decodeState = (s) => {

    return decodeCommonState(s) || decodeTransportState(s);
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
};
