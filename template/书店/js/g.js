$(function() {
    //zoom
    $(window).resize(function() {
        $('[zoom-width][zoom-heigh]:visible').each(function() {
            $(this).height($(this).width() * parseInt($(this).attr('zoom-heigh')) / parseInt($(this).attr('zoom-width')));
        });
    }).resize();
    //end

    //g_content img
    $('.g_content img').each(function() {
        $(this).width('auto').height('auto');
    });
    //end

    //menu
    $('.g_header .menu').click(function() {
        var n = $('.g_header .nav');
        n.hasClass('show') ? n.removeClass('show') : n.addClass('show');
        return false;
    });
    //end

    //tool
    $('.g_tool .top').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 300);
        return false;
    });
    //end
});