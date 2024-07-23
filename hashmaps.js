class Hashmap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = Array(this.capacity).fill([]);
    }

    // whenever access a bucket through an index, throw an error if out of bounds
    outOfBounds(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error('Trying to access index out of bound');
        }
    }

    checkSize() {
        if (this.loadFactor * this.capacity <= this.length()) {
            this.resize();
        }
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    resize() {
        // assign old buckets to new buckets. use new buckets to populate old buckets under new capacity
        let oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array(this.capacity).fill([]);

        // for each bucket, loop through and recalc based off new capacity
        oldBuckets.forEach((bkt) => {
            if (bkt.length !== 0) {
                let tmp = bkt.llhead;
                while (tmp !== null) {
                    this.set(tmp.kvpair.key, tmp.kvpair.value);
                    tmp = tmp.next;
                }
            }
        });
    }

    set(key, value) {
        const h_key = this.hash(key);

        // if first node
        if (this.buckets[h_key].length === 0) {
            this.buckets[h_key] = new LinkedList(new Node({ key, value }));
            this.checkSize();
            return;
        }
        if (this.buckets[h_key].contains(key)) {
            this.buckets[h_key].contains(key).kvpair.value = value;
            this.checkSize();
            return;
        }
        this.buckets[h_key].append({ key, value });
        this.checkSize();
    }

    get(key) {
        const h_key = this.hash(key);
        if (
            this.buckets[h_key].length !== 0 &&
            this.buckets[h_key].contains(key)
        ) {
            return this.buckets[h_key].contains(key).kvpair.value;
        }
        return null;
    }

    has(key) {
        const h_key = this.hash(key);
        if (
            this.buckets[h_key].length !== 0 &&
            this.buckets[h_key].contains(key)
        ) {
            return true;
        }
        return false;
    }

    remove(key) {
        for (let bkt of this.buckets) {
            if (bkt.length !== 0 && bkt.removeKey(key)) {
                return true;
            }
        }
        return false;
    }

    length() {
        return this.buckets.reduce((sum, bkt) => {
            if (bkt.length !== 0) {
                return sum + bkt.size();
            }
            return sum;
        }, 0);
    }

    clear() {
        this.buckets.fill([]);
    }

    keys() {
        return this.buckets.reduce((arr, bkt) => {
            if (bkt.length !== 0) {
                let tmp = bkt.llhead;
                while (tmp !== null) {
                    arr.push(tmp.kvpair.key);
                    tmp = tmp.next;
                }
            }
            return arr;
        }, []);
    }

    entries() {
        return this.buckets.reduce((arr, bkt) => {
            if (bkt.length !== 0) {
                let tmp = bkt.llhead;
                while (tmp !== null) {
                    arr.push([tmp.kvpair.key, tmp.kvpair.value]);
                    tmp = tmp.next;
                }
            }
            return arr;
        }, []);
    }
}

class LinkedList {
    constructor(llhead = null) {
        this.llhead = llhead;
    }

    append(kvpair) {
        if (this.llhead === null) {
            this.llhead = new Node(kvpair);
            return;
        }
        let tmp = this.llhead;
        while (tmp.next !== null) {
            tmp = tmp.next;
        }
        tmp.next = new Node(kvpair);
    }

    contains(key) {
        let tmp = this.llhead;
        while (tmp !== null && tmp.kvpair.key !== key) {
            tmp = tmp.next;
        }
        return tmp || null;
    }

    removeKey(key) {
        let tmp = this.llhead;
        let prev = null;
        while (tmp !== null && tmp.kvpair.key !== key) {
            prev = tmp;
            tmp = tmp.next;
        }
        if (tmp === null) return false;
        prev.next = tmp.next;
        return true;
    }

    size() {
        let tmp = this.llhead;
        let index = 0;
        while (tmp !== null) {
            tmp = tmp.next;
            index++;
        }
        return index;
    }
}

class Node {
    constructor(kvpair, next = null) {
        this.kvpair = kvpair;
        this.next = next;
    }
}

const h = new Hashmap();
h.set('apple', 'red');
h.set('banana', 'yellow');
h.set('carrot', 'orange');
h.set('dog', 'brown');
h.set('elephant', 'gray');
h.set('frog', 'green');
h.set('grape', 'green');
h.set('grape', 'purple');
h.set('hat', 'black');
h.set('ice cream', 'white');
h.set('jacket', 'blue');
h.set('kite', 'pink');
// h.set('lion', 'golden');
// h.set('liona', 'golden');
// h.set('lionb', 'golden');
// h.set('lionc', 'golden');
// h.set('liond', 'golden');
// h.set('lione', 'golden');
// h.set('lionf', 'golden');
// h.set('liong', 'golden');
// h.set('lionh', 'golden');
// h.set('lioni', 'golden');
// h.set('lionj', 'golden');
// h.set('lionk', 'golden');
// h.set('lionl', 'golden');
console.log(h.entries());
