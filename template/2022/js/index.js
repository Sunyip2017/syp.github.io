$(function(){
    $('.image-small-list li').bind('click',function() {
        $(this).addClass('on').siblings().removeClass('on');
        var text = $(this).attr('data-text');
        var src = $(this).find('img').attr('src');
        $('.image-big').find('span').html(text)
        $('.image-big').find('img').attr('src',src)
    })
    var width = document.body.clientWidth;
    if(width>768) {
        jQuery("#carousel_video").slide({
            autoPlay:true
          });
    }else{
        TouchSlide({ slideCell:"#carousel_video",  autoPlay:true });
    }


})