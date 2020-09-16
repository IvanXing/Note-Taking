/*
** 需求：并发往文件中写入数据，异步的，如何保证顺序
** 锁，单线程用数组，队列
*/

// 线性结构 => 索引
// 常见的数据结构：队列 （宏任务微任务），回调放入队列，取的时候 从第一个开始取出来执行 []，先进先出，arr.push  arr.shift()
// 栈结构：代码执行会销毁的顺序，栈型结构 （先进的后出）  arr.push  arr.pop()，保存上下文

// 数组每次操作，修改元素后的元素都要移动，时间复杂度O(n)

// 链表也是线性结构  
// - 单向链表  （每个节点有next属性指向下一个 头指向第一个元素 ）
// - 单向循环链表  ( 最后一个元素 指向头部)
// - 双向链表  （两个指针 分别指向前一个和后一个）
// - 双向循环链表  （两个指针 分别指向前一个和后一个，第一个的前一个指向尾，最后的后一个指向头）
// - 环形链表  最后一个元素的next 指向了 其他的节点

/*
** 场景：从头 和 尾取值，此种情况性能高  存放数据  平均查询的复杂度 (On)
*/

/*
** js 垃圾回收 靠的是 指针是否有引用关系
*/

class Node{
    constructor(element,next){
        this.element = element;
        this.next = next;
    }
}
// 对数据的增删改查
class LinkedList {
    constructor(){
        this.head = null; // 链表的头部
        this.size = 0; // 链表的长度
    }
    add(index, element) {  // 可以传索引，和值，也可以只传值，js的重载是根据参数做的
        if(arguments.length === 1) { // 说明没有索引，直接只传了值
            // 向后面添加
            element = index;  // 如果只传一个参数 那么传入的参数就是要添加的元素
            index = this.size;
        } 
        if(index < 0 || index > this.size) throw new Error('越界');

        if(index == 0){
            /*
            ** (0, 100)  (0, 200) 传入第二个值，第一个值就变成了index=1
            */
            let head = this.head; // 老的头部 
            // 设置新头，将老的头 变为当前节点的下一个，对next进行赋值
            this.head = new Node(element, head)
        }else{
            // 先找到当前索引的上一个
            let prevNode = this.getNode(index - 1);
            // 将当前上一个人的next 指向新的节点，新的节点的下一个指向上一个人的next
            prevNode.next =  new Node(element, prevNode.next);
        }
        this.size++;
    } 
    /*
    ** 根据index获取节点
    */  
    getNode(index){
        let current = this.head; // 从头开始找
        for(let i = 0; i < index; i++ ){
            current = current.next; // 一直向后
        }
        return current; // 不停的向后找 找到索引的位置
    }
}
let ll = new LinkedList();
// 添加key直接添加内容 在尾部添加 ，根据索引添加
ll.add(0,100);// 0
ll.add(0,200); // 1
ll.add(300); // 2
ll.add(1,500); // 2
console.dir(ll,{depth:1000});
// ll.add(2);

// 200  500 100  300

// 基于链表 可以封装队列 没有数组的塌陷的问题

// [2,3,4,5,6]
