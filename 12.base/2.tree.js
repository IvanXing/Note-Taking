// 时间复杂度 （数据完整的遍历一遍 0n）
// 二分查找 （只查找一办 Olog(n)）  

// 树的性能高

class Node {
    constructor(element, parent) { // parent是树中比较重要的属性
        this.element = element;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

class BST { // 不能通过索引取数据
    constructor(compare) {
        this.root = null;
        this.size = 0; // 包含着的节点个数
        this.compare = compare || this.compare;
    }
    compare(e1, e2) {
        return e1 - e2
    }
    add(element) {
        if (this.root == null) {
            this.root = new Node(element, null);
            this.size++;
            return;
        } else {
            // 增加的不是根节点， 第一种方式是根据递归， 写循环
            let currentNode = this.root; // 当前的根节点
            let compare = 0; // 当前比较的结果
            let parent = null; /// 当前父节点
            while (currentNode) {
                compare = this.compare(element, currentNode.element);
                parent = currentNode;
                if (compare > 0) { // 如果大于0 就找右树，小于0 找左树
                    currentNode = currentNode.right
                } else if (compare < 0) {
                    currentNode = currentNode.left;
                } else {
                    currentNode.element = element; // 如果比较后结果一样 就有最新的去覆盖
                    return;
                }
            }
            let newNode = new Node(element, parent);
            if (compare > 0) {
                parent.right = newNode
            } else {
                parent.left = newNode;
            }
        }
    }
    preorderTraversal(){ // 访问dom元素 一般采用的就是这种方式
        if(visitor == null) return;
        const traversal = (node) =>{
            if(node === null) return;
            visitor.visit(node);
            traversal(node.left);
            traversal(node.right);
        }
        traversal(this.root);
    }
    inorderTraversal(visitor){ // 按照由小到大排列
        if(visitor == null) return;
        const traversal = (node) =>{
            if(node === null) return;
            traversal(node.left);
            visitor.visit(node);
            traversal(node.right);
        }
        traversal(this.root);
    }
    postolderTraversal(visitor){ // 先操作子节点在操作父节点 
        if(visitor == null) return;
        const traversal = (node) =>{
            if(node === null) return;
            traversal(node.left);
            traversal(node.right);
            visitor.visit(node);
        }
        traversal(this.root);
    }
    levelOrderTraversal(visitor){
        if(this.root == null || visitor == null) return; // 一个节点都没有 直接return即可 
        let stack = [this.root]; // 根节点放入到队列中
        let index = 0;
        let currentNode = null
        while (currentNode = stack[index++]) { // 层序遍历  优化递归可以使用栈的方式 队列的方式
            visitor.visit(currentNode);
            if(currentNode.left){
                stack.push(currentNode.left);
            }
            if(currentNode.right){
                stack.push(currentNode.right);
            }
        }
        stack = null;
    }
    invertTree(){
        if(this.root == null ) return; // 一个节点都没有 直接return即可 
        let stack = [this.root]; // 根节点放入到队列中
        let index = 0;
        let currentNode = null
        while (currentNode = stack[index++]) { // 层序遍历  优化递归可以使用栈的方式 队列的方式
            let tmp = currentNode.left; // 左右交换
            currentNode.left = currentNode.right;
            currentNode.right = tmp;
            if(currentNode.left){
                stack.push(currentNode.left);
            }
            if(currentNode.right){
                stack.push(currentNode.right);
            }
        }
        stack = null;
        return this.root;
    }
}
let bst = new BST((e1, e2) => { // arr.sort 默认调用sort 就是简单a-b  自定义比较器
    return e1.age - e2.age
});
// let arr = [10, 8, 19, 6, 15, 22, 20, 10];
let arr = [{ age: 10, name: 'zs' }, { age: 8 }, { age: 19 }, { age: 6 }, { age: 15 }, { age: 22 }, { age: 20 }, { age: 10, name: 'lisi' }];
arr.forEach(element => {
    bst.add(element);
});
// 遍历方式 4种， 遍历树的目的 一般都是修改树 ，更改树的节点。 访问者模式
// bst.levelOrderTraversal({
//     visit(node){ // ast 语法树  babel-transform
//         console.log(node.element,'***');
//     }
// });

// 层序遍历


// 反转二叉树  遍历树 （交换左右树）
console.dir(bst.invertTree(),{depth:2000})