class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    };
};

class LinkedList {
    constructor(value) {
        this.head = new Node(value);
        this.tail = this.head;
        this.length = 1;
    };

    // O(1)
    printLength() {
        console.log(this.length);
    };

    // O(n)
    printList() {
        const array = [];
        let currentNode = this.head;
        while (currentNode) {
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        console.log(array);
    };

    // O(1)
    append(new_val) {
        const new_node = new Node(new_val);
        this.tail.next = new_node;
        this.tail = new_node;
        this.length++;
    };

    // O(1)
    prepend(new_val) {
        const new_node = new Node(new_val);
        new_node.next = this.head;
        this.head = new_node;
        this.length++;
    };

    // O(n)
    lookup(index) {
        if (index < 0 || index > this.length) return undefined
        let iteration = 0;
        let currentNode = this.head;
        while (iteration < index) {
            currentNode = currentNode.next;
            iteration++;
        };
        return currentNode.value;
    };

    // O(n)
    insert(index, new_val) {
        if (index == 0) {
            this.prepend(new_val);
            return;
        };
        if (index >= this.length) {
            this.append(new_val);
            return;
        }
        let currentNode = this.head;
        let iteration = 1;
        const new_node = new Node(new_val);
        while (iteration < index) {
            currentNode = currentNode.next;
            iteration++;
        }
        new_node.next = currentNode.next;
        currentNode.next = new_node;
        this.length++;
    };

    // O(n)
    delete(index) {
        if (index < 0 || index > this.length) return
        if (index === 0) {
            this.head = this.head.next;
            this.length--;
            return;
        }
        let currentNode = this.head;
        let iteration = 0;
        while (iteration < index - 1) {
            currentNode = currentNode.next;
            iteration++;
        }
        if (currentNode.next === this.tail) {
            this.tail = currentNode;
        }
        currentNode.next = currentNode.next.next;
        this.length--;
    };

    removeDuplicates() {
        let currentNode = this.head;
        while (currentNode && currentNode.next) {
            if (currentNode.value === currentNode.next.value) {
                currentNode.next = currentNode.next.next;
                this.length--;
            } else {
                currentNode = currentNode.next;
            }
        }
    };
};

// new list with val 10
const myLinkedList = new LinkedList(10);
myLinkedList.printList();

// target: 10 --> 5 --> 16
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.printList();

// target: 1 --> 2 --> 10 --> 5 --> 16
myLinkedList.prepend(2);
myLinkedList.prepend(1);
myLinkedList.printList();

// target: 1 --> 2 --> 3 --> 10 --> 5 -->16
myLinkedList.insert(2, 3);
myLinkedList.printList();

// target: 1 --> 3 --> 10 --> 5 --> 16
myLinkedList.delete(1);
myLinkedList.printList();

// target: remove duplicates
myLinkedList.append(16);
myLinkedList.append(17);
myLinkedList.append(17);
myLinkedList.printLength();
myLinkedList.printList();
myLinkedList.removeDuplicates();
myLinkedList.printLength();
myLinkedList.printList();

// target: print specific
// const index = 2;
// console.log(`Item at index ${index} in the list is ${myLinkedList.lookup(index)}`);