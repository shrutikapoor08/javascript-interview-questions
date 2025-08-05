//Write a function called powers which accepts a base and an exponent. The function should return the power to the base of the exponent

function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}

//
// console.log(power(2, 0));
// console.log(power(2, 2));
// console.log(power(2, 4));
//
//

function factorial(n) {
  if (n === 0) return 1;
  else return n * factorial(n - 1);
}
//
// console.log(factorial(1));
// console.log(factorial(2));
// console.log(factorial(4));
// console.log(factorial(7));

//Write a function that takes in an array of numbers and returns the product of them all
function productOfArray(inputArray) {
  if (inputArray.length === 0) return;
  if (inputArray.length === 1) return inputArray[0];
  else return productOfArray(inputArray.slice(1)) * inputArray[0];
}
//
// console.log(productOfArray([1, 2, 3]));
// console.log(productOfArray([1, 2, 3, 10]));

//Write a function called recursiveRange which accepts a number and adds up all the numbers from 0 to the number passed to the function
function recursiveRange(n) {
  if (n === 0) return 0;
  else return n + recursiveRange(n - 1);
}
//
// console.log(recursiveRange(6));
// console.log(recursiveRange(10));

//Write a recursive function fib
function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(1));
console.log(fibonacci(4));
console.log(fibonacci(10));
console.log(fibonacci(28));
console.log(fibonacci(35));

//Write a recursive function fib with caching
let cache = {};
function fibonacci_with_caching(n) {
  // Base Case
  if (n <= 1) {
    return n;
  }

  if (cache[n]) {
    return cache[n];
  }
  cache[n] = fibonacci_with_caching(n - 1) + fibonacci_with_caching(n - 2);
  return cache[n];
}

console.log(fibonacci_with_caching(1));
console.log(fibonacci_with_caching(4));
console.log(fibonacci_with_caching(10));
console.log(fibonacci_with_caching(28));
console.log(fibonacci_with_caching(35));
console.log(fibonacci_with_caching(500));
