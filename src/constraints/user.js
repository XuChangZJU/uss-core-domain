/**
 * Created by Administrator on 2018/3/31.
 */
const { userState: State } = require('../constants/userConstant');
const { Roles } = require('../constants/roleConstant2');

// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.LOGGEDIN.name]: {
        mobile: [
            State.normal
        ],
        nickname: [
            State.normal
        ],
        name: [
            State.normal
        ],
        gender: [
            State.normal
        ],
        head: [
            State.normal
        ],
        city: [
            State.normal
        ],
        province: [
            State.normal
        ],
        country: [
            State.normal
        ],
    },
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [State.normal]: [ State.disabled, State.dangerous],
        [State.dangerous]: [ State.normal ],
        [State.disabled]: [ State.normal ],
        [State.shadow]: [ State.normal],
    },
};



module.exports = {
    AttrsUpdateMatrix,
    StateTransformMatrix,
};
