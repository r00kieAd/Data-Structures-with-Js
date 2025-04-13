
class Node {
    constructor(val) {
        this.left = null;
        this.right = null;
        this.value = val;
    };
};

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.height = 0;
        this.found = false;
    };

    print() {
        traverse = (node) => {
            if (!node) return;
            const tree = {value: node.value};
            tree.left = node.left === null ? null : this.traverse(node.left);
            tree.right = node.right === null ? null : this.traverse(node.right);
            return tree;
        };
        const data = JSON.stringify(traverse((this.root)));
        console.log(data);
        return data;
    }

    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            this.height++;
            return;
        };
        insertLoop = (val) => {
            let node = this.root;
            while (true) {
                if (val < node.value) {
                    // traverse left
                    if (!node.left) {
                        node.left = new Node(val);
                        return;
                    };
                    node = node.left;
                } else {
                    // travese right
                    if (!node.right) {
                        node.right = new Node(val);
                        return;
                    };
                    node = node.right;
                };
            };
        };
        insertLoop(value);
    };

    lookup(value) {
        lookupLoop = (node, val) => {
            if (!node) return 'not found';
            if (node.value == val) {
                this.found = true;
                return node;
            };
            if (node.left && !this.found) {
                const leftResult = this.lookupLoop(node.left, val);
                if (leftResult) return leftResult;
            };
            if (node.right && !this.found) {
                const rightResult = this.lookupLoop(node.right, val);
                if (rightResult) return rightResult;
            }
            return 'not found';
        };
        const result = this.lookupLoop(this.root, value);
        this.found = false;
        console.log(result);
        return result;
    }

    // remove(){}
};

const tree = new BinarySearchTree();
/* 
              9
          /      \
        4          20
       /   \     /    \
    1       6  15     170
*/
// initial order of inertions
order = [9, 4, 6, 20, 170, 15, 1];
order.forEach(e => {
    tree.insert(e);
});
tree.print();
tree.lookup(2);
tree.lookup(9);
tree.insert(2);
tree.insert(99);
tree.print();

