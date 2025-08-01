
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
    console.log('memoized return')
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example usage:
function add(a, b) {
  console.log("Calculating sum...");
  return a + b;
}

const memoizeAddFn = memoize(add);

console.log(memoizeAddFn(1, 2)); // Calculates and returns 3
console.log(memoizeAddFn(1, 2)); // Returns cached 3 without calculating
console.log(memoizeAddFn(2, 3)); // Calculates and returns 5