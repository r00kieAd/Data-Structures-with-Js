
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
        this.found = null;
        this.balanced = null;
    };

    print(mode = 'pre_order') {
        // Node -> Left -> Right
        const preOrderTraverse = (node) => {
            if (!node) return;
            const tree = {value: node.value};
            tree.left = node.left === null ? null : preOrderTraverse(node.left);
            tree.right = node.right === null ? null : preOrderTraverse(node.right);
            return tree;
        };
        // Left -> Node -> Right
        const inOrderTraverse = (node) => {
            if (!node) return;
            let tree = {};
            tree.left = inOrderTraverse(node.left);
            tree.value = node.value;
            tree.right = inOrderTraverse(node.right);
            return tree;
        };
        // Left -> Right -> Node
        const postOrderTraverse = (node) => {
            if (!node) return;
            let tree = {};
            tree.left = postOrderTraverse(node.left);
            tree.right = postOrderTraverse(node.right);
            tree.value = node.value;
            return tree;
        };
        // Node -> Left -> Right (in queue)
        const levelOrderTraverse = (node) => {
            if (!node) return [];
            const queue = [node];
            const data = [];
            while (queue.length > 0) {
                const curr = queue.shift()
                data.push(curr.value);
                if (curr.left) queue.push(curr.left);
                if (curr.right) queue.push(curr.right);
            };
            return data;
        };
        let data = null;
        if (mode == 'pre_order') data = JSON.stringify(preOrderTraverse((this.root)));
        if (mode == 'post_order') data = JSON.stringify(postOrderTraverse((this.root)));
        if (mode == 'in_order') data = JSON.stringify(inOrderTraverse((this.root)));
        if (mode == 'level_order') data = levelOrderTraverse(this.root);
        console.log(`${mode}: ${data}`);
        return data;
    };

    printTopView() {
        if (!this.root) return [];
        const queue = [];
        const topViewMap = new Map();
        let minHd = 0, maxHd = 0;

        queue.push({node: this.root, hd: 0});

        while (queue.length > 0) {
            const {node, hd} = queue.shift();
            if (!topViewMap.has(hd)) {
                topViewMap.set(hd, node.value);
            };

            if (node.left) queue.push({node: node.left, hd: hd - 1});
            if (node.right) queue.push({node: node.right, hd: hd + 1});

            minHd = Math.min(minHd, hd);
            maxHd = Math.max(maxHd, hd);
        };

        const result = [];
        for (let i = minHd; i<= maxHd; i++) {
            result.push(topViewMap.get(i));
        };
        return result;
    };

    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            return;
        };
        const insertLoop = (val) => {
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
        const lookupLoop = (node, val) => {
            if (!node) return 'not found';
            if (node.value == val) {
                this.found = true;
                return node;
            };
            if (node.left && !this.found) {
                const leftResult = lookupLoop(node.left, val);
                if (leftResult) return leftResult;
            };
            if (node.right && !this.found) {
                const rightResult = lookupLoop(node.right, val);
                if (rightResult) return rightResult;
            }
            return 'not found';
        };
        this.found = false;
        const result = lookupLoop(this.root, value);
        this.found = null;
        console.log(result);
        return result;
    };

    traverse (node, checkBalance) {
        if (!node) {
            return 0;
        };
        const leftNodeBalance = this.traverse(node.left, checkBalance);
        const rightNodeBalance = this.traverse(node.right, checkBalance);
        const diff = Math.abs(leftNodeBalance - rightNodeBalance);
        if (checkBalance) this.balanced = diff > 1 ? false : this.balanced;
        return Math.max(leftNodeBalance, rightNodeBalance) + 1;
    };

    height(node = this.root) {
        const res = this.traverse(node, false);
        console.log(res);
        return res;
    };

    isBalanced(node = this.root) {
        this.balanced = true;
        this.traverse(node, true);
        const res = this.balanced;
        this.balanced = null;
        console.log(res);
        return res;
    };

    checkPathSum(target, pathSum, node) {
        if (!node) {
            return false;
        };

        pathSum += node.value;
        if (!node.left && !node.right) {
            return pathSum == target;
        };

        return (this.checkPathSum(target, pathSum, node.left) || this.checkPathSum(target, pathSum, node.right));
    };

    pathSum(target, node = this.root) {
        if (!node) {
            return false;
        };

        return this.checkPathSum(target, 0, node);
    };
    
    remove(value) {
        if (!this.root) return false;

        let currentNode = this.root;
        let parentNode = null;
        
        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else {
                // Node to delete found
                // Case 1: No right child.
                if (currentNode.right === null) {
                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.left;
                        } else {
                            parentNode.right = currentNode.left;
                        }
                    }
                }
                // Case 2: Right child with no left child.
                else if (currentNode.right.left === null) {
                    currentNode.right.left = currentNode.left;
                    if (parentNode === null) {
                        this.root = currentNode.right;
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = currentNode.right;
                        } else {
                            parentNode.right = currentNode.right;
                        }
                    }
                }
                // Case 3: Right child that has a left child.
                else {
                    // Find the leftmost node in the right subtree.
                    let leftmost = currentNode.right.left;
                    let leftmostParent = currentNode.right;
                    while (leftmost.left !== null) {
                        leftmostParent = leftmost;
                        leftmost = leftmost.left;
                    }
                    // Parent's left subtree now becomes leftmost's right subtree.
                    leftmostParent.left = leftmost.right;
                    // Replace currentNode with leftmost.
                    leftmost.left = currentNode.left;
                    leftmost.right = currentNode.right;
                    if (parentNode === null) {
                        this.root = leftmost;
                    } else {
                        if (currentNode.value < parentNode.value) {
                            parentNode.left = leftmost;
                        } else {
                            parentNode.right = leftmost;
                        }
                    }
                }
                return true;
            }
        }
        return false;
    };
};

const tree = new BinarySearchTree();
// initial order of inertions
order = [9, 4, 6, 20, 170, 15, 1];
order.forEach(e => {
    tree.insert(e);
});
tree.print('in_order');
tree.remove(170);
tree.print('in_order');
tree.remove(4);
tree.print('in_order');
// tree.height();
// tree.isBalanced();
// tree.insert(2);
// tree.insert(99);
// tree.print();
// tree.height();
// tree.isBalanced();
// tree.insert(69);
// tree.print();
// tree.height();
// tree.isBalanced();
// console.log(tree.printTopView());