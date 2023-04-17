const Tree = require('./Tree');

let tree = Tree();
let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
testArray = tree.mergeSort(tree.removeDuplicates(testArray));
tree.root = tree.buildTree(testArray, 0, testArray.length-1);
let traverseArray = [];

test('inserts node with data 15 into the tree', () => {
    expect(tree.insertNode(tree.root, 15).right.left.right.left.data).toBe(15);
})

test('removes node with data 7 from the tree', () => {
    expect(tree.deleteNode(tree.root, 7).left.right.right).toBe(null);
})

test('finds node with data 4 in the tree', () => {
    expect(tree.findNode(tree.root, 4).data).toBe(4);
    expect(tree.findNode(tree.root, 4).left.data).toBe(1);
    expect(tree.findNode(tree.root, 4).right.data).toBe(5);
})

test('returns level order array from tree', () => {
    expect(tree.levelOrder(tree.root)).toEqual([8, 4, 67, 1, 5, 9, 324, 3, 23, 6345, 15]);
})

test('returns in order array from tree', () => {
    expect(tree.inOrder(tree.root, true)).toEqual([1, 3, 4, 5, 8, 9, 15, 23, 67, 324, 6345]);
})

test('returns pre order array from tree', () => {
    expect(tree.preOrder(tree.root, true)).toEqual([8, 4, 1, 3, 5, 67, 9, 23, 15, 324, 6345]);
})

test('returns post order array from tree', () => {
    expect(tree.postOrder(tree.root, true)).toEqual([3,1, 5, 4, 15, 23, 9, 6345, 324, 67, 8]);
})

test('returns height of node in tree', () => {
    expect(tree.height(tree.findNode(tree.root, 4))).toBe(2);
    expect(tree.height(tree.findNode(tree.root, 67))).toBe(3);
    expect(tree.height(tree.findNode(tree.root, 8))).toBe(4);
})

test('returns depth of node in tree', () => {
    expect(tree.depth(8)).toBe(0);
    expect(tree.depth(9)).toBe(2);
    expect(tree.depth(15)).toBe(4);
})

test('verify that tree is balanced', () => {
    expect(tree.isBalanced()).toBeTruthy();
})

test('verify that tree is not balanced', () => {
    tree.insertNode(tree.root, 150);
    tree.insertNode(tree.root, 160);
    tree.insertNode(tree.root, 170);
    tree.insertNode(tree.root, 180);
    expect(tree.isBalanced()).toBeFalsy();
})

test('rebalance tree', () => {
    tree.root = tree.rebalance();
    expect(tree.isBalanced()).toBeTruthy();
})

test('returns level order array from tree after rebalance', () => {
    expect(tree.levelOrder(tree.root)).toEqual([23, 5, 170, 3, 9, 150, 324, 1, 4, 8, 15, 67, 160, 180, 6345]);
})

test('returns in order array from tree after rebalance', () => {
    expect(tree.inOrder(tree.root, true)).toEqual([
        1,   3,   4,   5,    8,
        9,  15,  23,  67,  150,
      160, 170, 180, 324, 6345
    ]);
})

test('returns pre order array from tree after rebalance', () => {
    expect(tree.preOrder(tree.root, true)).toEqual([
        23,   5,   3,   1,    4,
         9,   8,  15, 170,  150,
        67, 160, 324, 180, 6345
      ]);
})

test('returns post order array from tree after rebalance', () => {
    expect(tree.postOrder(tree.root, true)).toEqual([
        1,    4,   3,   8,  15,
        9,    5,  67, 160, 150,
      180, 6345, 324, 170,  23
    ]);
})