/*
Merge Sort
Time complexity = nLogn
Pseudo code -
Divide and conquer algorithm
 */


function merge (arr1, arr2) {
    let results = [];
    let i = 0;
    let j = 0;
    while(i <arr1.length && j< arr2.length) {
        if(arr1[i] < arr2[j]) {
            results.push(arr1[i]);
            i++;
        } else {
            results.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length){
        results.push(arr1[i]);
        i++;
    }

    while (j < arr2.length){
        results.push(arr2[j]);
        j++;
    }

    return results;
}

function mergeSort(arr) {
    if(arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
}


console.log(mergeSort([2, 3, 3, 4, 6, 7, 12]));