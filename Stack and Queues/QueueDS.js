class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    };
};

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    };

    peek(i) {
        if (i < 0 || this.length == 0 || i > this.length - 1) return undefined;
        if (i == 0) return this.first.value;
        if (i == this.length - 1) return this.last.value;
        let index = 0;
        let currNode = this.first;
        while (index < i && currNode.next) {
            currNode = currNode.next;
            index++;
        };
        return currNode.value;
    }

    enqueue(value) {
        const newNode = new Node(value);
        if (this.length == 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;
    }

    dequeue() {
        if (this.length == 0) return undefined;
        const data = this.first.value;
        this.first = this.first.next;
        if (!this.first) {
            this.last = null;
        }
        this.length--;
        return data;
    };

    print() {
        if (this.length == 0) {
            console.log([]);
            return;
        };
        let currentNode = this.first;
        process.stdout.write(`[`);
        while (currentNode) {
            process.stdout.write(` |${currentNode.value}| `);
            currentNode = currentNode.next;
        };
        process.stdout.write(`]\n`);
    };
};

const myQ = new Queue();
myQ.enqueue('Google');
myQ.enqueue('Amazon');
myQ.enqueue('Apple');
myQ.print();
console.log(myQ.dequeue());
myQ.enqueue('Google Next Year');
myQ.print();
console.log(myQ.peek(1));