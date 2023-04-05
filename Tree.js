function Tree() {

    let root = null;

    function buildTree(array, start, end) {
        let sortedArray = mergeSort(removeDuplicates(array));
        if(start > end)
            return null;
        let mid = parseInt((start + end)/2);
        let node = nodeFactory(sortedArray[mid]);
        node.left = buildTree(sortedArray, start, mid-1);
        node.right = buildTree(sortedArray, mid+1, end);

        return node;
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

    function insertNode(root, value) {
        let node = nodeFactory(value);
        if(root === null) {
            root = node;
            return root;
        }
        if(root.value > value)
            root.left = insertNode(root.left, value);
        else if(root.value < value)
            root.right = insertNode(root.right, value);
        return root;
    }

    function deleteNode(root, value) {
        if(root === null)
            return root;

        if(root.value > value)
            root.left = deleteNode(root.left, value);
        else if(root.value < value)
            root.right = deleteNode(root.right, value);
        else {
            if(root.left === null)
                return root.right;
            else if(root.right === null)
                return root.left;

            let rightTreeMin = root.right;
            while(rightTreeMin.left !== null) {
                rightTreeMin = rightTreeMin.left;
            }
            root.value = rightTreeMin.value;
            root.right = deleteNode(root.right, root.value);
        }

        return root;
    }

    return {
        root,
        buildTree,
        insertNode,
        deleteNode
    };
}

const nodeFactory = (value) => {
    return {
        value: value,
        left: null,
        right: null,
        toString: function() {
            return `{value: ${this.value}, left: ${this.left}, right: ${this.right}}`;
        }
    }
}

let tree = Tree();
// let testArray = [1, 2, 3, 4, 5];
let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
tree.root = tree.buildTree(testArray, 0, testArray.length-1);
console.log(`tree.root = ${tree.root}`);

tree.insertNode(tree.root, 15);
console.log(`tree.root = ${tree.root}`);

tree.deleteNode(tree.root, 7);
console.log(`tree.root = ${tree.root}`);
