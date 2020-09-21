/**
 * Created by Administrator on 2018/3/31.
 */
const { userState: State } = require('../constants/userConstant');
const { Roles } = require('../constants/roleConstant2');

// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.LOGGEDIN.name]: {
        mobile: [
            State.normal, State.shadow
        ],
        nickname: [
            State.normal, State.shadow
        ],
        name: [
            State.normal, State.shadow
        ],
        gender: [
            State.normal, State.shadow
        ],
        head: [
            State.normal, State.shadow
        ],
        city: [
            State.normal, State.shadow
        ],
        province: [
            State.normal, State.shadow
        ],
        country: [
            State.normal, State.shadow
        ],
        password: [
            State.normal, State.shadow
        ],
        cardNo: [
            State.normal, State.shadow
        ],
        cardImage: [
            State.normal, State.shadow
        ],
        cardType: [
            State.normal, State.shadow
        ],
        birth: [
            State.normal, State.shadow
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
