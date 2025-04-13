class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    };
};

class LinkedList {
    constructor(value) {
        this.head = new Node(value);
        this.tail = this.head;
        this.length = 1;
    };

    printLength() {
        console.log(this.length);
    };

    printList() {
        const array = [];
        let currentNode = this.head;
        while (currentNode) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        };
        console.log(array);
    };

    append(new_val) {
        const new_node = new Node(new_val);
        new_node.prev = this.tail;
        this.tail.next = new_node;
        this.tail = new_node;
        this.length++;
    };

    prepend(new_val) {
        const new_node = new Node(new_val);
        this.head.prev = new_node;
        new_node.next = this.head;
        this.head = new_node;
        this.length++;
    };

    insert(index, new_val) {
        if (index == 0) return this.prepend(new_val);
        if (index >= this.length) return this.append(new_val);
        let currentNode = this.head;
        let iters = 0;
        const new_node = new Node(new_val);
        while (iters < index - 1) {
            currentNode = currentNode.next;
            iters++;
        };
        new_node.next = currentNode.next;
        new_node.prev = currentNode;
        if (currentNode.next) {
            currentNode.next.prev = new_node;
        }
        currentNode.next = new_node;
        this.length++;
    }

    delete(index) {
        if (index < 0 || index > this.length) return;
        if (index == 0) {
            this.head = this.head.next;
            this.head.prev = null;
            this.length--;
            return;
        };
        let currentNode = this.head;
        let iters = 0;
        while (iters < index - 1) {
            currentNode = currentNode.next;
            iters++;
        };
        if (currentNode.next == this.tail) {
            this.tail = currentNode;
        };
        currentNode.prev = currentNode.prev.prev;
        currentNode.next = currentNode.next.next;
        this.length--;
    };

    lookup(index) {
        if (index < 0 || index > this.length) return undefined;
        let iters = 0;
        let currentNode = this.head;
        while (iters < index) {
            currentNode = currentNode.next;
            iters++;
        };
        return currentNode.value;
    }

};

// target: Initialize List with 1
const myList = new LinkedList(1);
myList.printList();
// target: add 2
myList.append(2);
myList.printList();
// target: add 3 at the begining
myList.prepend(3);
myList.printList();
// target: remove 3
myList.delete(0);
myList.printList();
// target: add 3 at index 1
myList.insert(1, 3);
myList.printList();
// target: get value at index 1
console.log(myList.lookup(1));
