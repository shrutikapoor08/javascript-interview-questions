function customSetTimeout(callback, delay) {
  let timeoutId;
  const wrapper = () => {
    callback();
    clearInterval(timeoutId);
  };
  timeoutId = setInterval(wrapper, delay);
}

// Example usage:
customSetTimeout(() => {
  console.log("Executed after delay!");
}, 1000);