class MyPromise {

    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thenCallbacks = [];
        this.catchCallbacks = [];


        const resolve = (val) => {
            if (this.state !== 'pending') return;

             if (val instanceof MyPromise) {
                    val.then(resolve, reject);
                    return;
                }
            queueMicrotask(() => {
               
            this.state = 'fulfilled';
            this.value = val;
            this.thenCallbacks.forEach(cb => cb(val));
            this.thenCallbacks = [];
            this.catchCallbacks = [];
            });


        }
        const reject = (err) => {
            if (this.state !== 'pending') return;
              if (err instanceof MyPromise) {
                    err.then(resolve, reject);
                    return;
                }

                queueMicrotask(() => {
            this.state = 'rejected';
            this.value = err;
            this.catchCallbacks.forEach(cb => cb(err));
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

            const onFulfilled = (val) => {
                if (typeof thenCb !== 'function') {
                    resolve(val);
                    return;
                }
                try {
                    const result = thenCb(val);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            };

            const onRejected = (err) => {
                if (typeof catchCb !== 'function') {
                    reject(err);
                    return;
                }
                try {
                    const result = catchCb(err);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            };


            if (this.state === 'pending') {
                this.thenCallbacks.push(onFulfilled);
                this.catchCallbacks.push(onRejected);
            }
            else if (this.state === 'fulfilled') {

                queueMicrotask(() => onFulfilled(this.value));


            }
            else if (this.state === 'rejected') {
                queueMicrotask(() => onRejected(this.value));
            }
        });

    }

    catch(catchCb) {
        return this.then(undefined, catchCb);
    }

    finally(cb) {
return this.then( result => {
    cb();
    return result;
}, error => {  
    cb();
    throw error;
});
    }
}

const myPromise = new MyPromise((resolve, reject) => {
    // Do something
    console.log("MyPromise started");
    const success = false;
    setTimeout(() => {
        if (success) resolve("MyPromise Success");
        else reject("MyPromise Failed");
    }, 2000);
});

myPromise
    .then((result) => {
        console.log(result);
        return result + " - processed";
    })
    .then((result) => {
        console.log("Second then", result);
        return result + " - more processing";
    })
    .catch((error) => {
        console.error("Error:", error);
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