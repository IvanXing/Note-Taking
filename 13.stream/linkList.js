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
    remove(index) {
        if (index === 0) {
            let node = this.head; // 头部节点
            if (!node) return null;
            this.head = node.next;
            this.size--;
            return node.element;
        }

    }

}
module.exports = LinkedList