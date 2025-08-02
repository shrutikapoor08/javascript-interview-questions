// Implement a function that controls how many times a functiom is 
// executed by limiting how many times it can execute over time.


function throttle(func, delay) {
let isThrottled = false;

  return function() {
    if(isThrottled) return;
    func.apply(this, arguments);
    isThrottled = true;

    setTimeout( () => {
      isThrottled = false;
    }, delay);
  }
}


const tlog = (i) => console.log("throttled Log!", i);
const throttledLog = throttle(tlog, 500);

for (let i = 0; i < 1000; i++) {
  (function (i) {
    throttledLog(i);
  })(i);
}

