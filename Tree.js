function Tree() {

    let root = null;
    let traverseArray = [];

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

    function inOrder(root, isFirstCall) {
        if(isFirstCall)
            traverseArray = [];
        if(root === null) 
            return;
        else {
            if(root.left) {
                inOrder(root.left, false);
            }
            traverseArray.push(root.data);
            if(root.right) {
                inOrder(root.right, false);
            }
        }
        return traverseArray;
    }

    function preOrder(root, isFirstCall) {
        if(isFirstCall)
            traverseArray = [];
        if(root === null) 
            return;
        else {
            traverseArray.push(root.data);
            if(root.left) {
                preOrder(root.left, false);
            }
            if(root.right) {
                preOrder(root.right, false);
            }
        }
        return traverseArray;
    }

    function postOrder(root, isFirstCall) {
        if(isFirstCall)
            traverseArray = [];
        if(root === null) 
            return;
        else {
            if(root.left) {
                postOrder(root.left, false);
            }
            if(root.right) {
                postOrder(root.right, false);
            }
            traverseArray.push(root.data);
        }
        return traverseArray;
    }

    function height(node) {
        let returnHeight = 0;
        if(node.left && node.right) {
            returnHeight++;
            left = node.left;
            let leftHeight = height(left);
            right = node.right;
            let rightHeight = height(right);
            (leftHeight > rightHeight) ? returnHeight += leftHeight : returnHeight += rightHeight;
        }
        else if(node.left) {
            returnHeight++;
            node = node.left;
            returnHeight += height(node);
        }
        else if(node.right) {
            returnHeight++;
            node = node.right;
            returnHeight += height(node);
        }
        return returnHeight;
    }

    function depth(data) {
        let depth = 0;
        let current = this.root;
        while(data !== current.data) {
            (current.data > data) ? current = current.left : current = current.right;
            depth++;
        }
        return depth;
    }

    function isBalanced() {
        return (Math.abs(height(this.root.left)-height(this.root.right)) <= 1);
    }

    function rebalance() {
        let array = inOrder(this.root, true);
        return buildTree(array, 0, array.length-1);
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
        isBalanced,
        rebalance
    };
}

module.exports = Tree;

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
