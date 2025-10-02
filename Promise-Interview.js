class MyPromise {

    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thenCallbacks = [];
        this.catchCallbacks = [];

        const resolve = (result) => {

            if (result instanceof MyPromise) {
                return result.then(resolve, reject);
            }

            queueMicrotask(() => {
                if (this.state !== 'pending') return;
                this.state = 'fulfilled';
                this.value = result;
                this.thenCallbacks.forEach(cb => cb(result));
                this.thenCallbacks = [];
                this.catchCallbacks = [];
            });
        }

        const reject = (error) => {

            queueMicrotask(() => {
                if (this.state !== 'pending') return;
                this.state = 'rejected';
                this.value = error;
                this.catchCallbacks.forEach(cb => cb(error));
                this.catchCallbacks = [];
                this.thenCallbacks = [];
            });
        }

        try {
            cb(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }

    then(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            const onFulfilledCb = (value) => {
                queueMicrotask(() => {
                    if (typeof thenCb !== 'function') {
                        resolve(value); //pass the value to the next then in the chain
                        return;
                    }
                    try {
                        const result = thenCb(value);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            }

            const onRejectedCb = (error) => {
                quqeueMicrotask(() => {
                    if (typeof catchCb !== 'function') {
                        reject(error); //pass the error to the next catch in the chain
                        return;
                    }
                    try {
                        const result = catchCb(error);
                        if (result instanceof MyPromise) {
                            result.then(resolve, reject);
                        } else {
                            resolve(result); // if catchCb returns a value, we consider it as resolved
                        }
                    } catch (err) {
                        reject(err);
                    }
                });
            }


            if (this.state === 'pending') {
                this.thenCallbacks.push(onFulfilledCb);
                this.catchCallbacks.push(onRejectedCb);
            }
            else if (this.state === 'fulfilled') {
                onFulfilledCb(this.value);
            }
            else if (this.state === 'rejected') {
                onRejectedCb(this.value);
            }
        })

    }
    catch(catchCb) {
        return this.then(undefined, catchCb)

    }
    finally(cb) {
        return this.then(
            (result) => {
                cb();
                return result; // pass the result to the next then
            },
            (error) => {
                cb();
                throw error; // rethrow the error to the next catch
            }
        );
    }

}

/* MyPromise implementation details

// ✅ States: pending → fulfilled or rejected
// ✅ resolve and reject functions
// ✅ then callback
// ✅ catch callback
// ✅ finally callback
// ✅ Chaining: return new MyPromise in then/catch
// ✅ Async handling
// ✅ Thenable adoption if you resolve with another promise
// ✅ Error handling in callbacks
// ✅ Edge cases: multiple calls to resolve/reject, non-function callbacks
*/

const myPromise = new MyPromise((resolve, reject) => {
    // Do something
    console.log("MyPromise started"); //call stack
    const success = true;
    setTimeout(() => { // Web API
        if (success) resolve("MyPromise Success");
        else reject("MyPromise Failed");
    }, 2000);
});

myPromise
    .then((result) => {
        console.log(result);
        return result + " - processed";
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .finally((result) => {
        // doesnt care about the result or error
        // calls the callback and passes nothing to the callback
        // it just signals that the promise is settled (either fulfilled or rejected)
        // and passes the value to the next then in the chain
        console.log("Finally called", result);
    })
    .then((result) => {
        console.log("Then after finally", result);
        return result;
    })
    .then((result) => {
        console.log("Second then", result);
        setTimeout(() => { // Web API
            console.log("Async operation in second then");
            return result + " - more processing";
        }, 1000);
    })
    .then((result) => {
        console.log("Third then after catch", result);
    })
    .then((result) => {
        console.log("Fourth then", result);
    })
    .catch((error) => {
        console.error("Second catch:", error);
    })