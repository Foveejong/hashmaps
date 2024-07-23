class Hashmap {
    constructor(size) {
        this.buckets = [];
        this.loadFactor = 0.75;
        this.capacity = 0;
        for (let i = 0; i < size; i++) {
            this.buckets.push([]);
        }
    }

    // whenever access a bucket through an index, throw an error if out of bounds
    outOfBounds(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error('Trying to access index out of bound');
        }
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode =
                (primeNumber * hashCode + key.charCodeAt(i)) %
                this.buckets.length;
        }

        return hashCode;
    }

    // checkSize() {
    //     if (this.loadFactor * this.capacity >= this.length()) {
    //         this.resize();
    //     }
    // }

    set(key, value) {
        const h_key = this.hash(key);

        // if first node
        if (this.buckets[h_key].length === 0) {
            this.buckets[h_key] = new LinkedList(new Node({ key, value }));
            return;
        }
        if (this.buckets[h_key].contains(key)) {
            this.buckets[h_key].contains(key).kvpair.value = value;
            return;
        }
        this.buckets[h_key].append({ key, value });
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
}

class Node {
    constructor(kvpair, next = null) {
        this.kvpair = kvpair;
        this.next = next;
    }
}

const h = new Hashmap(16);
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
h.set('lion', 'golden');
console.log(h);
