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


const log = (i) => console.log("Log!", i);
const debouncedLog = debounce(log, 500);


for (let i = 0; i < 1000; i++) {
  (function (i) {
    debouncedLog(i);
  })(i);
}


