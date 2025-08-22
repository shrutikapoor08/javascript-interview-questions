class MyPromise {

    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thenCallbacks = [];
        this.catchCallbacks = [];


        const resolve = (val) => {
            if (this.state !== 'pending') return;

            this.state = 'fulfilled';
            this.value = val;
            this.thenCallbacks.forEach(cb => cb(val));


        }
        const reject = (val) => {
            if (this.state !== 'pending') return;

            this.state = 'rejected';
            this.value = val;
            this.catchCallbacks.forEach(cb => cb(val));

        }

        try {
            cb(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(thenCb, catchCb) {
        if (this.state === 'pending') {
            if (thenCb) this.thenCallbacks.push(thenCb);
            if (catchCb) this.catchCallbacks.push(catchCb);
        }
        else if (this.state === 'fulfilled') {
            this.thenCallbacks.forEach(cb => { cb(this.value); });
        }
        else if (this.state === 'rejected') {
            this.catchCallbacks.forEach(cb => { cb(this.value); });
        }
        return this;

    }

    catch(catchCb) {
        return this.then(undefined, catchCb);
    }

    finally() {

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
    })
    .then((result) => {
        console.log("Second then", result);
    })
    .catch((error) => {
        console.error("Error:", error);
    })
    .then((result) => {
        console.log("Third then after catch", result);
    });

