# 一. 封装两个函数
## 1. function getSiblings(node){}
### (1) 获取兄弟节点
```
function getSiblings(node){
  var allChildren = node.parentNode.children;
  var array = {length:0};
  for(let i = 0; i < allChildren.length; i++){
    if(allChildren[i] !== node){
      array[array.length] = allChildren[i];
      array.length += 1;
    }
  }
  return array;
}

console.log( getSiblings(item3) );
```
- 尽量用=== !== 少用== != 双等号规则复杂

## 2. function addClass(node, classes){}

### (1). DOM中添加class只可逐个添加
```
item3.classList.add('a');
item3.classList.add('b');
item3.classList.add('c');
```
### (2). 利用数组循环添加class
```
var classes = ['a', 'b', 'c'];
classes.forEach( (value)=> item3.classList.add(value) );
```
### (3). 使class既能add又能remove
```
var classes = {'a':true, 'b':false, 'c':true};

for(let key in classes){
    var value = classes[key];
    if(value){
        item3.classList.add(key);
    }else{
        item3.classList.remove(key);
    }
}
```
### (4). 封装
```
function addClass(node, classes){
    for(let key in classes){
        var value = classes[key];
        if(value){
            node.classList.add(key);
        }else{
            node.classList.remove(key);
        }
    }
}
addClass(item3, {'a':true, 'b':false, 'c':true})
```
-优化
```
function addClass(node, classes){
    for(let key in classes){
        var value = classes[key];
        var methodName = value ? 'add' : 'remove';
        node.classList[methodName](key);  //obj.x()等价于obj['x']
    }
}
addClass(item3, {'a':true, 'b':false, 'c':true})
```
# 二. 命名空间
- 有标识指向性且可避免命名全局变量冲突
```
window.ffdom = {};
ffdom.getSiblings = getSiblings;
ffdom.addClass = addClass;
ffdom.getSiblings(item3);
ffdom.addClass( item3, {a: true, b: false, c: true});
```

```
window.ffdom = {}      /*yui库就是这种命名方式*/
ffdom.getSiblings = function (node) {   /* API */
  var allChildren = node.parentNode.children

  var array = {
    length: 0
  }
  for (let i = 0; i < allChildren.length; i++) {
    if (allChildren[i] !== node) {
      array[array.length] = allChildren[i]
      array.length += 1
    }
  }
  return array
}
ffdom.addClass = function (node, classes) {
  classes.forEach( (value) => node.classList.add(value) )
}

ffdom.getSiblings(item3)
ffdom.addClass(item3, ['a','b','c'])
```
# 三. Node上操作

## 1. Node的原型链上添加
```
Node.prototype.getSiblings = function(){
  var allChildren = this.parentNode.children /* this指向调用时的item3 */

  var array = {
    length: 0
  }
  for (let i = 0; i < allChildren.length; i++) {
    if (allChildren[i] !== this) {          /* 所有node改成this */
      array[array.length] = allChildren[i]
      array.length += 1
    }
  }
  return array
}

Node.prototype.addClass = function (classes) {
  classes.forEach( (value) => this.classList.add(value) )
}

conso.log( item3.getSiblings() )
console.dir(item3)                 /* 打印item3的原型有getSiblings */

item3.getSiblings()
item3.getSiblings.call(item3)      /* 用call调用，第一个参数为this */
item3.addClass(['a','b','c'])
item3.addClass.call(item3, [abc])  /* 传入参数为arguments */
```
## 2. 再写一个Node调用原型Node
### (1). 普通Node
```
window.Node2 = function(node){
    return{
        function getSiblings(node){
            var allChildren = node.parentNode.children;
            var array = {
                length:0
            };
         for(let i = 0; i < allChildren.length; i++){
            if(allChildren[i] !== node){
                array[array.length] = allChildren[i];
                array.length += 1;
            }
         }
         return array;
        },
        addClass = function (node, classes) {
            classes.forEach( (value) => node.classList.add(value) )
        }
    }
}

var node2 = Node2(item3);  /* 方法赋在Node2上 */
node2.getSiblings();   /* 不需要用this注意和上一点区分 */
node2.addClass(['a', 'b', 'c']);
```
### (2). jQuery的设计思路
```
window.jQuery = function(node){
    ...
}

var node2 = jQuery(item3);     /* 传入的是node */       
node2.getSiblings();                 
node2.addClass(['a', 'b', 'c']);
//将node2换成jQuery，构造函数，就是这种模式，接收旧结点，返回一个新jQuery对象
```
### (3). jQuery传入字符串(选择器)
```
window.jQuery = function(nodeOrSelector){
    let node;                                                         //此处node
    if( typeof nodeOrSelector === 'string' ){
        node = document.querySelector(nodeOrSelector)
    }else{
        node = nodeOrSelector
    }
    return{
        getSiblings:function(){},
        addClass:function(classes){
            classes.forEach( (value) => node.classList.add(value) );  //此处node
        }
    }
}

var node2 = jQuery('#item3');     /* 传入的是选择器 */   
// var node2 = jQuery( 'ul > li:nth-child(3)' )  /* 同上 */  
node2.getSiblings();                 
node2.addClass(['red', 'b', 'c']);  /* 选项3变红 */
```
- 函数中node用到其他函数中的node=》闭包，node是有作用域的，函数外访问不到
### (4). jQuery传入操作多个节点
```
window.jQuery = function(nodeOrSelector){
    let nodes = {};
    if( typeof nodeOrSelector === 'string' ){
        let temp = document.querySelectorAll(nodeOrSelector);  //带有原型链
        for( let i = 0; i < temp.length; i++ ){     //不需要多余的原型链，原型链指向object
            nodes[i] = temp[i];
        }
        node.length = temp.length;
    }else if(nodeOrSelector instanseof Node){
        nodes = {
            0: nodeOrSelector,
            length: 1
        }
    }
    //获取多个节点的兄弟节点
    nodes.getSiblings:function(){
    },

    //增加多个class
    nodes.addClass:function(classes){
        classes.forEach( (value) => {
            for(let i = 0; i < nodes.length; i++){
                node[i].classList.add(value);
            }
            //也就是
            //nodes[0].classList.add(value);
            //...
            //nodes[4].classList.add(value);

        } ); 
    }

    //获取节点文本内容
    nodes.getText = function(){
        var texts = [];
        for( let i = 0; i < node.length; i++ ){
            texts.push(nodes[i].textContent);
        }
        return texts;
    }

    //设置节点文本内容
    nodes.setText = function(text){
        for( let i = 0; i < node.length; i++ ){
            nodes[i].textContent = text;
        }
    }

    //合并上述set和text，没给参数是获取，给了参数是设置
    nodes.text = function(text){
        if(text === undefined){
            var texts = [];
            for( let i = 0; i < node.length; i++ ){
                texts.push(nodes[i].textContent);
             }
            return texts; 
        }else{
            for( let i = 0; i < node.length; i++ ){
                nodes[i].textContent = text;
            }
        }
    }

    return nodes
}

var node2 = jQuery('ul > li');   //5个li
//node2 是一个hash {0: li, 1: li, length: 5, addClass: f, text: f}
node2.addClass(['blue']);
console.log(nodes2.getText());  //["选项1",..."选项5"]
node2.setText('hi');    //五个选项都变成hi
console.log(node2.text());
```
- 操作一个访问不到的变量nodes就是闭包的意义
- jQuery 使用了 prototype
- window.$ = jQuery

---

# 共用html
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>JS Bin</title>
</head>
<body>
  <li id="item1">选项1</li>
  <li id="item2">选项2</li>
  <li id="item3">选项3</li>
  <li id="item4">选项4</li>
  <li id="item5">选项5</li>
</body>
</html>
```
