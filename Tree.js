function Tree() {

    let root = null;

    function buildTree(array, start, end) {
        if(start > end)
            return null;
        else {    
            let mid = parseInt((start + end)/2);
            let node = nodeFactory(array[mid]);
            node.left = buildTree(array, start, mid-1);
            node.right = buildTree(array, mid+1, end);
            return node;
        }
    }

    function mergeSort(array) {
        if(array.length < 2)
            return array;
        if(array.length >= 2){
            let left = array.slice(0, array.length/2);
            let right = array.slice(array.length/2);
            left = mergeSort(left);
            right = mergeSort(right);
            for(let i = 0; i < array.length; i++) {
                if(left[0] < right[0] || !right[0]) {
                    array[i] = left.shift();
                }
                else if(right[0] < left[0] || !left[0]) {
                    array[i] = right.shift();
                }
            }
            return array;
        }
    }

    function removeDuplicates(array) {
        let unique = [];
        array.forEach(val => {
            if(!unique.includes(val))
                unique.push(val);
        })
        return unique;
    }

    function insertNode(root, data) {
        let node = nodeFactory(data);
        if(root === null) {
            root = node;
            return root;
        }
        if(root.data > data)
            root.left = insertNode(root.left, data);
        else if(root.data < data)
            root.right = insertNode(root.right, data);
        return root;
    }

    function deleteNode(root, data) {
        if(root === null)
            return root;

        if(root.data > data)
            root.left = deleteNode(root.left, data);
        else if(root.data < data)
            root.right = deleteNode(root.right, data);
        else {
            if(root.left === null)
                return root.right;
            else if(root.right === null)
                return root.left;

            let rightTreeMin = root.right;
            while(rightTreeMin.left !== null) {
                rightTreeMin = rightTreeMin.left;
            }
            root.data = rightTreeMin.data;
            root.right = deleteNode(root.right, root.data);
        }

        return root;
    }

    function findNode(root, data) {
        if(root === null)
            return root;

        if(root.data === data)
            return root;
        else if(root.data > data)
            return findNode(root.left, data);
        else if(root.data < data)
            return findNode(root.right, data);
    }

    function levelOrder(root, func) {
        let queue = [];
        let data = [];
        if(root) {
            queue.push(root);
        }
        while(queue.length > 0) {
            temp = queue.shift();
            (func) ? func(root.data) : data.push(temp.data);
            if(temp.left) {
                queue.push(temp.left);
            }
            if(temp.right) {
                queue.push(temp.right);
            }
        }
        return data;
    }

    function inOrder(root, func) {
        if(root === null) 
            return;
        else {
            if(root.left) {
                inOrder(root.left);
            }
            (func) ? func(root.data) : console.log(root.data);
            if(root.right) {
                inOrder(root.right);
            }
        }
    }

    function preOrder(root, func) {
        if(root === null) 
            return;
        else {
            (func) ? func(root.data) : console.log(root.data);
            if(root.left) {
                preOrder(root.left);
            }
            if(root.right) {
                preOrder(root.right);
            }
        }
    }

    function postOrder(root, func) {
        if(root === null) 
            return;
        else {
            if(root.left) {
                postOrder(root.left);
            }
            if(root.right) {
                postOrder(root.right);
            }
            (func) ? func(root.data) : console.log(root.data);
        }
    }

    function height(node) {
        let height = 0;
        while(node.left || node.right) {
            height++;
            if(node.left) 
                node = node.left;
            else if(node.right)
                node = node.right;
        }
        return height;
    }

    function depth(node) {
        let depth = 0;
        let current = this.root;
        while(node !== current.data) {
            (current.data > node) ? current = current.left : current = current.right;
            depth++;
        }
        return depth;
    }

    function isBalanced() {
        return (Math.abs(height(this.root.left)-height(this.root.right)) <= 1);
    }

    return {
        root,
        mergeSort,
        removeDuplicates,
        buildTree,
        insertNode,
        deleteNode,
        findNode,
        levelOrder,
        inOrder,
        preOrder, 
        postOrder,
        height,
        depth,
        isBalanced
    };
}

const nodeFactory = (data) => {
    return {
        data: data,
        left: null,
        right: null,
        toString: function() {
            return `{data: ${this.data}, left: ${this.left}, right: ${this.right}}`;
        }
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

let tree = Tree();
let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
testArray = tree.mergeSort(tree.removeDuplicates(testArray));
tree.root = tree.buildTree(testArray, 0, testArray.length-1);
console.log(prettyPrint(tree.root));

// tree.insertNode(tree.root, 15);
// console.log(prettyPrint(tree.root));

// tree.deleteNode(tree.root, 7);
// console.log(prettyPrint(tree.root));

// console.log(tree.findNode(tree.root, 4));

// console.log(tree.levelOrder(tree.root));
// tree.inOrder(tree.root);
// tree.preOrder(tree.root);
// tree.postOrder(tree.root);

// console.log('height = ' + tree.height(tree.findNode(tree.root, 4)));
// console.log('depth = ' + tree.depth(5));

console.log(tree.isBalanced());