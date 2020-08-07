const {
    action,
    decodeAction,
    state,
    decodeState,
} = require('../action');



const getMethod = {
    helpYourself: 1,
};

const decodeGetMethod = (gm) => {
    const GM = {
        [getMethod.helpYourself]: '顾客自取',
    };

    return GM[gm];
};



//
// const action = Object.assign({}, commonAction, {
//     solve: 301,
//     resubmit: 401,
//     finish: 501,
// });
//
// const decodeAction = (a) => {
//     const S = {
//         [action.solve]: '处理',
//         [action.resubmit]: '重新提交',
//         [action.finish]: '完成',
//     };
//
//     return S[a] || decodeCommonAction(a);
// };
//
// const STATE_TRAN_MATRIX = {
//     [action.solve]: [state.pending, state.solved],
//     [action.resubmit]: [state.solved, state.pending],
//     [action.finish]: [state.solved, state.finished],
// };
module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    getMethod,
    decodeGetMethod,
};