// Implement a function that recurseively flattens an array into a single level

const flatten = (arr) => {
return arr.reduce((acc, val) => {
    if(Array.isArray(val)){
        return acc.concat(flatten(val));
    }
    return acc.concat(val);
},[])
}


console.log(flatten([1, 2, 3])); // [1, 2, 3]

console.log(flatten([1, [2, [3, [4, [5]]]]])); // [1, 2, 3, 4, 5]

console.log(flatten([1, 2, [3, [4, [5]]]])) // [1, 2, 3, 4, 5]