/*
** 链表的反转
*/

class Node { // 节点类
    constructor(element, next) {
        this.element = element; // 存放的数据
        this.next = next;
    }
}
class LinkedList {
    constructor() {
        this.head = null; // 头指针
        this.size = 0; // 链表的长度
    }
    add(index, element) {
        if (arguments.length === 1) {
            element = index;
            index = this.size;
        }
        if (index < 0 || index > this.size) throw new Error('越界');

        if (index == 0) { // 在索引为0的位置上插入元素
            let head = this.head;
            this.head = new Node(element, head)
        } else {
            let prevNode = this.getNode(index - 1);
            prevNode.next = new Node(element, prevNode.next);
        }
        this.size++;
    }
    getNode(index) {
        if (index < 0 || index > this.size) throw new Error('越界');
        let current = this.head
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }
    /*
    ** 递归反转链表
    */
    reverseLinkList1() {
        const reverse = (head) => {
            // 递归停止条件=> 如果没有元素 或者后面没元素了 就不在反转了
            if (head === null || head.next === null) return head;
             // 递归两两反转
            let newHead = reverse(head.next);
            head.next.next = head;
            head.next = null;
            return newHead;
        }
        this.head = reverse(this.head);
        return this.head;
        // 最终返回反转后的结果
    }
    /*
    ** 非递归反转链表
    ** head->A->B->C->D
    ** 创建一个newHead，把A指向null，newhead指向A，B指向A，head指向B...
    */
    reverseLinkList2() {
        let head = this.head; // 获取原来的第一个元素
        if (head === null || head.next === null) return head; // 处理临界条件
        let newHead = null; // 创建一个新头
        while (head != null) {
            let temp = head.next; // 先保留B
            head.next = newHead; // A => null;
            newHead = head; // newHead = > A
            head = temp
        }
        this.head = newHead;
        return this.head;
    }
}
let ll = new LinkedList();

ll.add(1);
ll.add(2);
ll.add(3);
console.log(ll.reverseLinkList2());

// 链表的反转