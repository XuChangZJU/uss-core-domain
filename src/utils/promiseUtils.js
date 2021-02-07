/**
 * Created by Administrator on 2017/2/16.
 */

 /**
  * 每个promise都执行完，formatErrorFn处理单个promise抛出的异常数据
  * @param {*} promises 
  * @param {*} formatErrorFn 
  */
Promise.every = async (promises, formatErrorFn) => {
    const result = promises.map(
        () => false
    );
    const promises2 = promises.map(
        async (ele, idx) => {
            try {
                result [idx] = await ele;
            }
            catch (err) {
                if (formatErrorFn) {
                    result [idx] = formatErrorFn(err);
                }
                else {
                    result [idx] = err;
                }
            }
        }
    );

    await Promise.all(promises2);
    if (formatErrorFn) {
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

/**
 * 依次执行异步动作
 * @param {*} promises 
 */
Promise.oneByOne = async (promises) => {
    const result = [];
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
