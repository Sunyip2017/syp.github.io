// 监听事件
 window.addEventListener('scroll', function(){
 	let t = $('body, html').scrollTop();   // 目前监听的是整个body的滚动条距离
 	if(t>0){
		$('.box').addClass('box-active')
	}else{
		$('.box').removeClass('box-active')
	}
 })