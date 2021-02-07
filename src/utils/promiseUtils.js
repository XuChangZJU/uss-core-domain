/**
 * Created by Administrator on 2017/2/16.
 */

 /**
  * 每个promise都执行完，若allowFailure为真，则返回结果数组，否则有异常会抛出异常
  * @param {*} promises 
  * @param {*} allowFailure 
  */
Promise.every = async (promises, allowFailure) => {
    const result = promises.map(
        () => false
    );
    const promises2 = promises.map(
        async (ele, idx) => {
            try {
                result [idx] = await ele;
            }
            catch (err) {
                result [idx] = err;
            }
        }
    );

    await Promise.all(promises2);
    if (allowFailure) {
        return result;
    }
    
    const firstFailure = result.find(
        ele => ele instanceof Error
    );
    if (firstFailure) {
        throw firstFailure;
    }
    return result;
};

Promise.oneByOne = async (promises) => {
    function iterator (idx){
        if (idx === promises.length){
            return Promise.resolve(result);
        }
        return promises[idx]()
            .then(
                (r) => {
                    result.push(r);
                    return iterator(idx + 1);
                }
            )
    }
    return iterator(0);
};
