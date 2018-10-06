## 一. 内容样式行为分离
### 1. html只负责内容, CSS只负责样式, JS只负责行为

### 2. html控制样式 => 内容与样式混杂
```
<body bgcolor=green>
    <center>
        <font color=red size=20>你好</font>
    </center>
</body>
```

### 3. CSS控制内容
```
<body id=x></body>      <!--显示正常，用户无法选中你好，js也无法取到-->

div::after{
    content: '你好'
}

console.log(x.innerText)    //打印出来为空
```
### 4. 不要用js控制样式
- $div.show()
- $div.hide()

- JS控制样式
```
<body id=x>你好</body>

var $div = $('#x')
$div.hide()            //消失，display: none
$div.show()            //出现，div.style.display => 'block' 强制变成block

//hide之前如果没有默认样式取不到，则为none，show之后会默认变成block

$div.addClass('disable')   //应该加样式去控制显示隐藏
```

## 二. 轮播初实现
- 通过 overflow:hidden 限定显示范围，去动背景图片

```
<!DOCTYPE html>
<html>

<head>
<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
    .images{
      display: flex;                <!--float代码较多-->
      align-items: flex-start;
      border: 1px solid red;
      transition: transform 0.5s;   <!--过渡效果-->
      <!--transition: all 0.5s;-->
    }
    .images > img{
      vertical-align: top;
    }
    .window{
      width: 300px;           <!--window大小继承父元素，页面大小-->
      overflow: hidden;       <!--限定显示窗口，超出隐藏-->
      border: 10px solid green;
    }
  </style>
</head>

<body>
  <div class="window">
    <div class="images" id=images>
      <img src="https://fthmb.tqn.com/0ui_Zw01Ht9NHJkSBlqOIC1IH44=/960x0/filters:no_upscale()/yorkshire-terrier-583788122-581630e85f9b581c0b018a00.jpg" width=300 alt="图片1" height=200>
      <img src="https://canna-pet.com/wp-content/uploads/2017/06/20-longest-living-dog-breeds_canna-pet-e1498599846169.jpg" width=300 alt="" height=200>
      <img src="https://fthmb.tqn.com/0ui_Zw01Ht9NHJkSBlqOIC1IH44=/960x0/filters:no_upscale()/yorkshire-terrier-583788122-581630e85f9b581c0b018a00.jpg" width=300 alt="" height=200>
      <img src="https://canna-pet.com/wp-content/uploads/2017/06/20-longest-living-dog-breeds_canna-pet-e1498599846169.jpg" width=300 alt="" height=200>
    </div>
  </div>
  <button id="p1">第一张</button>
  <button id="p2">第二张</button>
  <button id="p3">第三张</button>
</body>

</html>
```
```
$(p1).on(click, function(){         //touchstart也可以，$(p1).onclick(function(){...})
    $(image).css({                  //给style加了一句 .style比.css更合理
        //transform: 'translateX(0)'  //页面比例放大或者缩小transform会有抖动bug
        'margin-left': 0
    })
})

$(p2).on(click, function(){
    $(image).css({
        //transform: 'translateX(-300px)'
        'margin-left': '-300px'
    })
})

$(p3).on(click, function(){
    $(image).css({
        //transform: 'translateX(-600px)'
        'margin-left': '-600px'
    })
})
```
- img中有alt，写宽度和高度是为了防止图片加载完成，后面的图片往后退，先占位。
- 目前JS在操作CSS

## 三.轮播细节

```
<!DOCTYPE html>
<html>

<head>
<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
  <meta charset="utf-8">
  <title>JS Bin</title>
  <style>
    .images{
      display: flex;
      align-items: flex-start;
      transition: all 0.5s;
    }
    .images > img{
      vertical-align: top;
    }
    .window{
      width: 300px;
      overflow: hidden;
    }
  </style>
</head>

<body>
  <div class="window">
    <div class="images" id=images>
      <img src="https://fthmb.tqn.com/0ui_Zw01Ht9NHJkSBlqOIC1IH44=/960x0/filters:no_upscale()/yorkshire-terrier-583788122-581630e85f9b581c0b018a00.jpg" width=300 alt="图片1" height=200>
      <img src="https://canna-pet.com/wp-content/uploads/2017/06/20-longest-living-dog-breeds_canna-pet-e1498599846169.jpg" width=300 alt="" height=200>
      <img src="https://fthmb.tqn.com/0ui_Zw01Ht9NHJkSBlqOIC1IH44=/960x0/filters:no_upscale()/yorkshire-terrier-583788122-581630e85f9b581c0b018a00.jpg" width=300 alt="" height=200>
      <img src="https://canna-pet.com/wp-content/uploads/2017/06/20-longest-living-dog-breeds_canna-pet-e1498599846169.jpg" width=300 alt="" height=200>
    </div>
  </div>
  <span id=buttons>
    <span>第1张</span>
    <span>第2张</span>
    <span>第3张</span>
    <span>第4张</span>
  </span>
</body>

</html>
```
- 实现自动点击
```
var allButtons = $('#buttons > span')    //伪数组

for (let i = 0; i < allButtons.length; i++) {
  $(allButtons[i]).on('click', function(x) {
    console.log(x.target)                          //输出<span>第1张</span> ...  
    console.log(x.currentTarget)                   //目前同上，区别在事件委托，推荐
    console.log('hi')
    var index = $(x.currentTarget).index()         //index会去找这是第几个对象，并返回
    var p = index * -300
    $('#images').css({
      transform: 'translate(' + p + 'px)'          //px前不要有空格
    })
  })
}

var n = 0;
allButtons.eq(n%3).trigger('click')      //只有三张图片，n%3得出余数，012三个数中自动点击
setInterval(()=>{
    n += 1;
    allButtons.eq(n%3).trigger('click')  //实现自动播放
}, 1000)
```

- 实现高亮，且浮到图中暂停
```
var allButtons = $('#buttons > span')

for (let i = 0; i < allButtons.length; i++) {
  $(allButtons[i]).on('click', function(x) {
    console.log('hi')
    var index = $(x.currentTarget).index()
    var p = index * -300
    $('#images').css({
      transform: 'translate(' + p + 'px)'
    })
    n = index                                  //解决点击图片和button冲突
    allButtons.eq(n)
      .addClass('red')
      .siblings('.red').removeClass('red')
  })
}



var n = 0;
var size = allButtons.length
allButtons.eq(n % size).trigger('click')
  .addClass('red')                            //高亮
  .siblings('.red').removeClass('red')        //移除别的高亮，前一个接收选择器，后一个接收类名

var timerId = setInterval(() => {
  n += 1
  allButtons.eq(n % size).trigger('click')
    .addClass('red')
    .siblings('.red').removeClass('red')
}, 1000)

$('.window').on('mouseenter', function() {    //鼠标移入
  window.clearInterval(timerId)
})

$('.window').on('mouseleave', function() {    //鼠标移出
  timerId = setInterval(() => {
    n += 1
    allButtons.eq(n % size).trigger('click')
      .addClass('red')
      .siblings('.red').removeClass('red')
  }, 3000)
})
```

- 优化JS
```
var allButtons = $('#buttons > span')

for (let i = 0; i < allButtons.length; i++) {
  $(allButtons[i]).on('click', function(x) {
    var index = $(x.currentTarget).index()
    var p = index * -300
    $('#images').css({
      transform: 'translate(' + p + 'px)'
    })
    n = index
    activeButton(allButtons.eq(n))
  })
}



var n = 0;
var size = allButtons.length
allButtons.eq(n % size).trigger('click')


var timerId = setTimer()

function setTimer() {
  return setInterval(() => {
    n += 1
    allButtons.eq(n % size).trigger('click')
  }, 3000)
}

function activeButton($button) {
  $button
    .addClass('red')
    .siblings('.red').removeClass('red')
}

$('.window').on('mouseenter', function() {
  window.clearInterval(timerId)
})

$('.window').on('mouseleave', function() {
  timerId = setTimer()
})
```
