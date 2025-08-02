/*
JavaScript Map
O(1) read/write/delete by key
Insertion order tracking — first inserted = least recently used


*/

class LRUCache {
    constructor(capacity = 2) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key){
        if(!this.cache.has(key)) return -1;

        let value = this.cache.get(key);
        this.cache.delete(key)
        this.cache.set(key,value);

        return value;

    }
    put(key, value) {
        if(this.cache.size === this.capacity) {
            let firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);

        }

        if(this.cache.has(key)) {
                this.cache.delete(key)
        }
        this.cache.set(key,value)

    }
}


const LRU = new LRUCache(2);
LRU.put(1, 1); //{1 => 1}
LRU.put(2, 2); // {1 => 1, 2=> 2}
console.log(LRU.get(1)); // returns 1
console.log(LRU.get(2)); // returns 2
LRU.put(3, 3); // removes key 1 because it's least recently used { 2=>2 , 3 => 3}
console.log(LRU.get(3)); // returns 3 
console.log(LRU.get(1)); // returns -1 (not found)