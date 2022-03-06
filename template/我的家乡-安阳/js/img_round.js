window.onload = function() {
    var container = document.getElementById("container");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var timer;
    
    //animate 函数，在当前left值得基础上向右移动 offset px,如果向左移动距离超过图六位置就变为图一位置，向右移动距离超过图二位置就变为图七位置
    function animate(offset) {
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';
    if (newLeft > -1000) {
    list.style.left = -5000 + 'px';
    }
    if (newLeft < -5000) {
    list.style.left = -1000 + 'px';
    }
    }
    
    //将当前显示图片对应的小圆点样式改变
    function buttonsShow() {
    //将所有的小圆点的样式清除
    for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].className == "on") {
    buttons[i].className = "";
    }
    }
    //数组从0开始，故index需要-1
    buttons[index - 1].className = "on";
    }
    
    //点击产生查看前一张效果，animate移动距离改变，小圆点显示改变，当index=1时还要查看前一张时，index变为5
    prev.onclick = function () {
    index -= 1;
    if (index < 1) {
    index = 5
    }
    buttonsShow();
    animate(600);
    };
    
    //点击产生查看后一张效果，animate移动距离改变，小圆点显示改变
    next.onclick = function () {
    index += 1;
    if (index > 5) {
    index = 1
    }
    animate(-1000);
    buttonsShow();
    };
    
    //通过定时器调用next.onclick（）实现每两秒滚动一次
    function play() {
    //重复执行的定时器
    timer = setInterval(function () {
    next.onclick();
    }, 2000)
    }
    
    //清除定时器实现停止滚动
    function stop() {
    clearInterval(timer);
    }
    container.onmouseover = stop; //在鼠标进入onmouseover时，停止每两秒滚动一次
    container.onmouseout = play; //在鼠标离开onmouseover时，开始每两秒滚动一次
    play(); //在onload后就调用play()
    
    //为每个小按钮添加onclick事件，当点击按钮时会跳动到按钮对应的图片
    for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
    //当前图片点击当前的小圆点不执行以下代码。
    if (this.className == "on") {
    return;
    }
    /* 这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上 */
    /* 由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
    var clickIndex = parseInt(this.getAttribute('index'));
    var offset = 1000 * (clickIndex - index); //这个index是当前图片停留时的index
    animate(-offset);
    index = clickIndex; //存放鼠标点击后的位置，用于小圆点的正常显示
    buttonsShow();
    }
    }
    }