// Implement a Debounce Function

// if function is being called when the timer is running, do not do anthing and reset the timer. 
function debounce(func, wait) {
  let timeout;
    return function (){
        const args = arguments;
        const thisContext = this;

        if(timeout) clearTimeout(timeout);
        timeout = setTimeout( () => func.apply(thisContext, args), wait);

    }
}

function throttle(func, delay) {
  let isThrottled = false;

  return function (...args) {
    if (!isThrottled) {
      func.apply(this, args);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}


const dlog = (i) => console.log("debounced Log!", i);
const tlog = (i) => console.log("throttled Log!", i);
const debouncedLog = debounce(dlog, 500);
const throttledLog = throttle(tlog, 500);


for (let i = 0; i < 1000; i++) {
  (function (i) {
    debouncedLog(i);
  })(i);
}
for (let i = 0; i < 1000; i++) {
  (function (i) {
    throttledLog(i);
  })(i);
}
