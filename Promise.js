
class MyPromise {
    constructor(cb) {
      this.state = 'pending';
      this.value = undefined;
      this.thenCallbacks = [];
      this.catchCallbacks = [];
   
      try {
        cb(this._resolve.bind(this), this._reject.bind(this))
      } catch(err) {
        this._reject(err);
      }
    }

    _resolve(val){
      if(this.state != "pending") return;

      this.state = 'fulfilled';
      this.value = val;
      this.thenCallbacks.forEach( cb => cb(val))

    }
    _reject(val){
      if(this.state != "pending") return;

      this.state = 'rejected';
      this.value = val;
      this.catchCallbacks.forEach( cb => cb(val))

    }

    then(thenCb, catchCb) {
      return new MyPromise((resolve, reject) => {
      this.thenCallbacks.push(result => {
        if(thenCb == null) {
          resolve(result);
          return;
        }


        try {
            resolve(thenCb(result));
        } catch(error) {
          reject(error)
        }
      })

      this.catchCallbacks.push(result => {
        if(catchCb == null) {
          reject(result);
          return;
        }


        try {
            reject(catchCb(result));
        } catch(error) {
          reject(error)
        }
      })
      
      

      
        if(this.state === "pending"){  
        this.thenCallbacks.forEach(cb => cb(this.value))
        this.catchCallbacks.forEach(cb => cb(this.value))
        }
      })

    }
    catch(catchCb) {
        return this.then(undefined, catchCb)
    }

    finally(cb) {
      
    }
} 


const promise = new MyPromise((resolve, reject) => {
  // Do something
  setTimeout(() => {
    resolve("Success");
  }, 2000);
});

// Gives back .then() and .catch() and .finally()
promise
  .then((result) => {
    console.log(result);
  })
  .then(() => {
    console.log("Second then");
    throw new Error("WE HAVE AN ERROR");
  })
  .catch((error) => {
    console.log("Catched", error);
  })