const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const {
    category,
    decodeCategory
} = require('./trade');


const state = {
    success: 501
};

const decodeState = (s) => {
    const S = {
        [state.success]: '成功',
    }
    return S[s];
}

const action = Object.assign({
}, commonAction);

const decodeAction = (a) => {
    return decodeCommonAction(a);
}

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    category,
    decodeCategory,
};