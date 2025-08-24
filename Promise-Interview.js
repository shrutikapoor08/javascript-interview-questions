class MyPromise {

    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thenCallbacks = [];
        this.catchCallbacks = [];

        const resolve = (result) => {
            // the promise is fulfilled,
            // call all the then callbacks
            // pass the result to the callbacks
            if (this.state !== 'pending') return;

            if (result instanceof MyPromise) {
                result.then(resolve, reject);
                return;
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
            // the promise is rejected,
            // call all the catch callbacks
            // pass the error to the callbacks
            if (this.state !== 'pending') return;

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
            const onFullfilled = (value) => {
                queueMicrotask(() => {
                    if (typeof thenCb != 'function') {
                        resolve(value);
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

            const onRejected = (error) => {
                queueMicrotask(() => {
                    if (typeof catchCb != 'function') {
                        reject(error);
                        return;
                    }
                    try {
                        const result = catchCb(error);
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


            if (this.state === 'pending') {
                this.thenCallbacks.push(onFullfilled);
                this.catchCallbacks.push(onRejected);
            }
            else if (this.state === 'fulfilled') {
                onFullfilled(this.value);

            } else if (this.state === 'rejected') {
                onRejected(this.value);
            }

        });
    }

    catch(catchCb) {
        return this.then(null, catchCb);
    }

    finally(cb) {
        // finally is called regardless of the promise state
        return this.then(
            (val) => { cb(); return val; },
            (error) => { cb(); throw error })
    }
}


const promise = new Promise((resolve, reject) => {
    // Do something
    console.log("Promise started");
    const success = true;
    setTimeout(() => {
        if (success) resolve("MyPromise Success");
        else reject("MyPromise Failed");
    }, 2000);
});



/* MyPromise implementation details

// ✅ States: pending → fulfilled or rejected
// ✅ resolve and reject functions
// ✅ then callback
// ✅ catch callback
// ✅ finally callback
// ✅ Chaining: return new MyPromise in then/catch
// ✅ Async handling
// ✅Thenable adoption if you resolve with another promise
// ✅Error handling in callbacks
// ✅Edge cases: multiple calls to resolve/reject, non-function callbacks
*/


promise
    .then((result) => {
        console.log(result);
        return result + " - processed";
    }, (error) => {
        console.error("First then catch", error);
        throw new Error("Error in first then");
    })
    .then((result) => {
        console.log("Second then", result);
        return result + " - further processed";
    })
    .then((result) => {
        const p = new Promise((resolve) => {
            setTimeout(() => {
                console.log("Third then", result);
                resolve(result + " - setTimeout processed");
            }, 1000);
        });
        return p;
    })
    .then((result) => {
        console.log("Fourth then", result);
    })
    .finally(() => {
        console.log("Finally called");
    })
    .then((result) => {
        console.log("Then after finally", result);
    });