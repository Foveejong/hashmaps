class Hashset {
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
                    this.set(tmp.key);
                    tmp = tmp.next;
                }
            }
        });
    }

    set(key) {
        const h_key = this.hash(key);

        // if first node
        if (this.buckets[h_key].length === 0) {
            this.buckets[h_key] = new LinkedList(new Node(key));
            this.checkSize();
            return;
        }
        this.buckets[h_key].append(key);
        this.checkSize();
    }

    get(key) {
        const h_key = this.hash(key);
        if (
            this.buckets[h_key].length !== 0 &&
            this.buckets[h_key].contains(key)
        ) {
            return this.buckets[h_key].contains(key).key;
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
                    arr.push(tmp.key);
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

    append(key) {
        if (this.llhead === null) {
            this.llhead = new Node(key);
            return;
        }
        let tmp = this.llhead;
        while (tmp.next !== null) {
            tmp = tmp.next;
        }
        tmp.next = new Node(key);
    }

    contains(key) {
        let tmp = this.llhead;
        while (tmp !== null && tmp.key !== key) {
            tmp = tmp.next;
        }
        return tmp || null;
    }

    removeKey(key) {
        let tmp = this.llhead;
        let prev = null;
        while (tmp !== null && tmp.key !== key) {
            prev = tmp;
            tmp = tmp.next;
        }
        if (tmp === null) return false;

        // if first node
        if (!prev) {
            this.llhead = null;
            return true;
        }
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
    constructor(key, next = null) {
        this.key = key;
        this.next = next;
    }
}

const h = new Hashset();
h.set('apple');
h.set('banana');
h.set('carrot');
h.set('dog');
h.set('elephant');
h.set('frog');
h.set('grape');
h.set('grape');
h.set('hat');
h.set('ice cream');
h.set('jacket');
// h.set('kite');
// h.set('lion');
// h.set('liona');
// h.set('lionb');
// h.set('lionc');
// h.set('liond');
// h.set('lione');
// h.set('lionf');
// h.set('liong');
// h.set('lionh');
// h.set('lioni');
// h.set('lionj');
// h.set('lionk');
// h.set('lionl');
console.log(h.remove('ice cream'));
