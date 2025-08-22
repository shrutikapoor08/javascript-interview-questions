class MyPromise {

    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thenCallbacks = [];
        this.catchCallbacks = [];


        const resolve = (val) => {
            if(this.state !== 'pending') return;

            this.state = 'fulfilled';
            this.value = val;
            this.thenCallbacks.forEach(cb => cb(val));
           

        }
        const reject = (val) => {
            if(this.state !== 'pending') return;

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
        if (this.thenCb) this.thenCallbacks.push(thenCb);
        if (this.catchCb) this.catchCallbacks.push(catchCb);
       }
        else if (this.state === 'fulfilled') {
            this.thenCallbacks.forEach(cb => { cb(this.value); });
        } 
        else if (this.state === 'rejected') {
            this.catchCallbacks.forEach(cb => { cb(this.value); });
        }
        
    }

    catch() {
        return this.then(undefined, catchCb);
    }

    finally() {

    }
}

const myPromise = new MyPromise((resolve) => {
    // Do something
    console.log("MyPromise started");

    setTimeout(() => {
        reject("MyPromise Success");
    }, 2000);
});

myPromise
  .then((result) => {
    console.log(result);
  })
  .then(() => {
    console.log("Second then");
  })
  .catch((error) => {
    console.error("Error:", error);
  });



const promise = new Promise((resolve) => {
    // Do something
    console.log("Promise started");
    setTimeout(() => {
        resolve("Promise Success");
    }, 2000);
});

promise
    .then((result) => {
        console.log(result);
    })
    .then(() => {
        console.log("Second then");
    })
