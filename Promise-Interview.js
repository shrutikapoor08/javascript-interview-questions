class MyPromise {

    constructor(cb) {
        this.state = 'pending';
        this.value = undefined;
        this.thenCallbacks = [];
        this.catchCallbacks = [];
    }

    then() {

    }

    catch() {  

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

/* MyPromise implementation details

// ✅ States: pending → fulfilled or rejected
// ✅ Callbacks: then, catch, finally
// resolve and reject functions
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
    })
    // .then((result) => {
    //     console.log("Second then", result);
    //     return result + " - more processing";
    // })
    // .catch((error) => {
    //     console.error("Error:", error);
    // })
    // .then((result) => {
    //     console.log("Third then after catch", result);
    // })
    // .then((result) => {
    //     console.log("Fourth then", result);
    // })
    // .catch((error) => {
    //     console.error("Second catch:", error);
    // })