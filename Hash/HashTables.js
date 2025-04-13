// const hashTable = {};
// hashTable["key1"] = "value1";
// hashTable["key2"] = "value2";

// console.log(hashTable.key1); // will output value 1

// we can also use map as hashtable
// const map = new Map();
// map.set("key3", "value3");
// console.log(map.get("key3"));

// to prevent hash collisions:

class hashTables {
    constructor(size) {
        this.table = new Array(size);
        this.index;
    };

    hash(key) {
        let hash = 0;
        for (let char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.table.length;
    };

    set(key, value) {
        this.index = this.hash(key);
        if (!this.table[this.index]) {
            this.table[this.index] = [];
        }
        this.table[this.index].push([key, value]);
        return `${key} created`;
    };

    keys () {
        const bucket = this.table;
        let allKeys = [];
        for (let currItem of bucket) {
            if (currItem) {
                allKeys.push(currItem[0][0]);
            }
        };
        return allKeys;
    };

    iterate(key, value, u) {
        this.index = this.hash(key);
        const bucket = this.table[this.index];
        if (bucket) {
            let i = 0;
            for (let [k, v] of bucket) {
                if (k === key) {
                    if (u) {
                        this.table[this.index][i][1] = value;
                        return `${k} updated`;
                    };
                    return v;
                };
                i++;
            };
        };
        return undefined;
    };

    get(key) {
        return this.iterate(key, "", false);
    };

    update(key, value) {
        return this.iterate(key, value, true);
    };
}

const ht = new hashTables(10);
console.log(ht.set("key1", "value1"));
console.log(ht.get("key1"));
console.log(ht.update("key1", "value2"));
console.log(ht.get("key1"));
console.log('-----All Keys-----');
console.log(ht.keys().includes('key1'));

// Exercise: First Reccuring Character
// Given an array, return the first recurring character
// Example: [2,5,1,2,3,5,1,2,4] should return 2
// Example: [2,1,1,2,3,5,1,2,4] should return 1
// Example: [2,3,4,5] should return undefined

const firstRecurringCharacter = (arr) => {
    const ht = new hashTables(arr.length);
    for (let i of arr) {
        if (ht[i]) return i;
        ht[i] = 'found';
    };
    return undefined;
}

// console.log(firstRecurringCharacter([2,3,4,5]));
