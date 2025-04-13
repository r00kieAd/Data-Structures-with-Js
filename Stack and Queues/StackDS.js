class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    };
};

class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
    };

    peek(i) {
        if (i == 0 || this.length == 1) return this.top.value;
        if (i >= this.length || i < 0) return undefined;
        let currNode = this.top;
        let index = this.length - 1;
        while (index > i && currNode) {
            index--;
            currNode = currNode.next;
        };
        return currNode.value;
    };

    push(val) {
        const newNode = new Node(val);
        if (this.top) {
            newNode.next = this.top;
        } else {
            this.bottom = newNode;
        };
        this.top = newNode;
        this.length++;
    };

    pop() {
        if (this.length == 0) return undefined;
        const data = this.top.value;
        const newNode = this.top.next;
        this.top = newNode;
        this.length--;
        if (this.length == 0) {
            this.bottom = null;
        };
        return data;
    };

    print() {
        let currNode = this.top;
        if (!currNode) return;
        console.log('-'.repeat(10));
        let index = this.length;
        while (currNode) {
            console.log(`${currNode.value} -> ${index - 1}`);
            index--;
            currNode = currNode.next;
        };
        console.log('-'.repeat(10));
    };

    size() {
        return this.length;
    }
};

const myStack = new Stack();
myStack.push(0);
myStack.push(10);
myStack.push(20);
myStack.print();
myStack.pop();
myStack.print();
console.log(myStack.peek(1));
myStack.push('Udemy');
myStack.print();
console.log(myStack.peek(2));
myStack.push('LinkedIN');
myStack.print();
console.log(myStack.peek(2));
myStack.push('YouTube');
myStack.print();
console.log(myStack.peek(4));
console.log(`Size: ${myStack.size()}`);
