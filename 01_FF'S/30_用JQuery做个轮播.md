## 一.内容样式行为分离
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

//hide之前如果没有默认样式，show之后会默认变成block

$div.addClass('disable')   //应该加样式去控制显示隐藏
```