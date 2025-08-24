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
            this.state = 'fulfilled';
            this.value = result;
            this.thenCallbacks.forEach(cb => cb(result));
            this.thenCallbacks = [];
        }

        const reject = (error) => {
            // the promise is rejected,
            // call all the catch callbacks
            // pass the error to the callbacks
            if (this.state !== 'pending') return;
            this.state = 'rejected';
            this.value = error;
            this.catchCallbacks.forEach(cb => cb(error));
            this.catchCallbacks = [];
        }

        try {
            cb(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(thenCb, catchCb) {
        // simple implementation
        if (this.state === 'pending') {
            if (thenCb) this.thenCallbacks.push(thenCb);
            if (catchCb) this.catchCallbacks.push(catchCb);
        }

        if (this.state === 'fulfilled' && thenCb) {
            this.thenCallbacks.forEach(cb => cb(this.value));
            this.thenCallbacks = [];

        }

        if (this.state === 'rejected' && catchCb) {
            this.catchCallbacks.forEach(cb => cb(this.value));
            this.catchCallbacks = [];
        }
        return this;
    }

    catch(catchCb) {
        this.then(null, catchCb);

    }

    finally(cb) {
        // finally is called regardless of the promise state
        return this.then(
            (val) => { cb(); return val; },
            (error) => { cb(); throw error })
    }
}

const myPromise = new MyPromise((resolve, reject) => {
    // Do something
    console.log("MyPromise started");
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
// Chaining: return new MyPromise in then/catch
// Async handling
// Thenable adoption if you resolve with another promise
// Error handling in callbacks
// Edge cases: multiple calls to resolve/reject, non-function callbacks
*/


myPromise
    .then((result) => {
        console.log(result);
        return result + " - processed";
    }, (error) => {
        console.error("First then catch", error);
        throw new Error("Error in first then");
    })
    .finally(() => {
        console.log("Finally called");
    })
    .then((result) => {
        console.log("Then after finally", result);
    });