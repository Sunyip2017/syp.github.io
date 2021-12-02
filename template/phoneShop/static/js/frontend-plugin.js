(function ($) {
    "use strict";
    function dungar_init_menu_toggle() {
        var contain = '.dungar-nav-toggle';
        $(contain).each(function () {
            var _main = $(this);
            _main.children('.menu-item.parent').each(function () {
                var curent = $(this).find('.submenu');

                $(this).children('.toggle-submenu').on('click', function () {
                    $(this).parent().children('.submenu').slideToggle(500);
                    _main.find('.submenu').not(curent).slideUp(500);

                    $(this).parent().toggleClass('show-submenu');
                    _main.find('.menu-item.parent').not($(this).parent()).removeClass('show-submenu');
                });

                var next_curent = $(this).find('.submenu');

                next_curent.children('.menu-item.parent').each(function () {

                    var child_curent = $(this).find('.submenu');
                    $(this).children('.toggle-submenu').on('click', function () {
                        $(this).parent().parent().find('.submenu').not(child_curent).slideUp(500);
                        $(this).parent().children('.submenu').slideToggle(500);

                        $(this).parent().parent().find('.menu-item.parent').not($(this).parent()).removeClass('show-submenu');
                        $(this).parent().toggleClass('show-submenu');
                    })
                });
            });
        });
    }
    // click menu
    $(document).on('click', '.bar-open-menu', function () {
        $(this).toggleClass('active');
        $(this).closest('.main-header').find('.header-nav').toggleClass('show-menu');
        return false;
    });
    $(document).on('click', '.widget .list-color a,.variations .attribute a', function (e) {
        e.preventDefault();
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });
    // vertical-menu
    $(document).on('click', '.block-title', function () {
        $(this).closest('.block-nav-categori').toggleClass('active');
        $(this).closest('.block-nav-categori').find('.verticalmenu-content').toggleClass('show-up');
        return false;
    });
    $(document).on('click', '.bar-open-menu,.vertical-menu-overlay', function () {
        $('body').toggleClass('vertical-menu-open');
        return false;
    });
    $(document).on('click', '.error-404 .toggle-hightlight', function () {
        $(this).closest('.text-404').find('.search-form').toggleClass('open');
        return false;
    });
    // ----------dungar_custom_scrollbar-------------------
    function dungar_custom_scrollbar() {
        $('.dungar-mini-cart .minicart-items').mCustomScrollbar();
        $('.dungar-mini-cart .minicart-items').change(function () {
            $('.dungar-mini-cart .minicart-items').mCustomScrollbar();
        });
    }

    function dungar_custom_scrollbar_header_nav() {
        $('.header.vertical-style .header-nav .container-wapper').mCustomScrollbar();
        $('.header.vertical-style .header-nav .container-wapper').change(function () {
            $('.header.vertical-style .header-nav .container-wapper').mCustomScrollbar();
        });
    }

    //------------------ Video Lightbox------------
    function dungar_video() {
        $('.quick-install').simpleLightboxVideo();
    }

    // --------------------remove_class_equal--------------------------
    function dungar_remove_class_review() {
        var _winw = $(window).innerWidth();
        if (_winw < 992) {
            $('.sevice-item.style-1').removeClass('equal-container').find('.equal-element').removeAttr('style');
        }
        else {
            $('.sevice-item.style-1').addClass('equal-container');
        }
    }

    // -----------dungar_details_thumd--------------------
    function dungar_details_thumd_zoom() {
        /* ------------------------------------------------
         Arctic modal
         ------------------------------------------------ */
        if ($.arcticmodal) {
            $.arcticmodal('setDefault', {
                type: 'ajax',
                ajax: {
                    cache: false
                },
                afterOpen: function (obj) {

                    var mw = $('.modal_window');

                    mw.find('.custom_select').customSelect();

                    mw.find('.product_preview .owl_carousel').owlCarousel({
                        margin: 10,
                        themeClass: 'thumbnails_carousel',
                        nav: true,
                        navText: [],
                        rtl: window.ISRTL ? true : false
                    });

                    Core.events.productPreview();

                    addthis.toolbox('.addthis_toolbox');
                }
            });
        }
        // ---------Popup sizechart---------------
        if ($('#size_chart').length > 0) {
            $('#size_chart').fancybox();
        }

        if ($.fancybox) {
            $.fancybox.defaults.direction = {
                next: 'left',
                prev: 'right'
            }
        }
        /* ------------------------------------------------
         Fancybox
         ------------------------------------------------ */
        if ($('.fancybox_item').length) {
            $('.fancybox_item').fancybox({
                openEffect: 'elastic',
                closeEffect: 'elastic',
                helpers: {
                    overlay: {
                        css: {
                            'background': 'rgba(0,0,0, .6)'
                        }
                    },
                    thumbs: {
                        width: 50,
                        height: 50
                    }
                }
            });
        }
        if ($('.fancybox_item_media').length) {
            $('.fancybox_item_media').fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                helpers: {
                    media: {}
                }
            });
        }
        /* ------------------------------------------------
         Elevate Zoom
         ------------------------------------------------ */
        if ($('#img_zoom').length) {
            $('#img_zoom').elevateZoom({
                zoomType: "inner",
                gallery: 'thumbnails',
                galleryActiveClass: 'active',
                cursor: "crosshair",
                responsive: true,
                easing: true,
                zoomWindowFadeIn: 500,
                zoomWindowFadeOut: 500,
                lensFadeIn: 500,
                lensFadeOut: 500
            });
            $(".open_qv").on("click", function (e) {
                var ez = $(this).siblings('img').data('elevateZoom');
                $.fancybox(ez.getGalleryList());
                e.preventDefault();
            });
        }
    }

    // -------chosen----------------------------------------------------

    $(".chosen-select").chosen({disable_search_threshold: 10});

    /* TOGGLE */
    function dungar_dropdown() {
        $(document).on('click', '.header-control .close', function () {
            $(this).closest('.dungar-dropdown').removeClass('open');
        });
        $(document).on('click', function (event) {
            var _target = $(event.target).closest('.dungar-dropdown');
            var _allparent = $('.dungar-dropdown');

            if (_target.length > 0) {
                _allparent.not(_target).removeClass('open');
                if (
                    $(event.target).is('[data-dungar="dungar-dropdown"]') ||
                    $(event.target).closest('[data-dungar="dungar-dropdown"]').length > 0
                ) {
                    _target.toggleClass('open');
                    return false;
                }
            } else {
                $('.dungar-dropdown').removeClass('open');
            }
        });
    }

    function dungar_mobile_block() {
        $(document).on('click', '.header-device-mobile .item.has-sub>a', function () {
            $(this).closest('.header-device-mobile').find('.item').removeClass('open');

            $(this).closest('.item').addClass('open');
            return false;
        });
        $(document).on('click', '.header-device-mobile .item .close', function () {
            $(this).closest('.item').removeClass('open');
            return false;
        });
        $(document).on('click', '*', function (event) {
            if (!$(event.target).closest(".header-device-mobile").length) {
                $(".header-device-mobile").find('.item').removeClass('open');
            }
        })
    }

    // -------slick----------------------------------------------------
    function dungar_init_carousel() {
        $('.owl-slick').not('.slick-initialized').each(function () {
            var _this = $(this),
                _responsive = _this.data('responsive'),
                _config = [];

            if ($('body').hasClass('rtl')) {
                _config.rtl = true;
            }
            if (_this.hasClass('slick-vertical')) {
                _config.prevArrow = '<span class="pe-7s-angle-up"></span>';
                _config.nextArrow = '<span class="pe-7s-angle-down"></span>';
            } else {
                _config.prevArrow = '<span class="fa fa-angle-left"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right"></span>';
            }
            _config.responsive = _responsive;
            _config.cssEase = 'linear';

            _this.slick(_config);
            _this.on('afterChange', function (event, slick, direction) {
                _this.find('.slick-active:first').addClass('first-slick');
                _this.find('.slick-active:last').addClass('last-slick');
            });
            _this.on('beforeChange', function (event, slick, currentSlide) {
                _this.find('.slick-slide').removeClass('last-slick');
                _this.find('.slick-slide').removeClass('first-slick');
            });
            if (_this.hasClass('slick-vertical')) {
                equal_elems();
                setTimeout(function () {
                    _this.slick('setPosition');
                }, 0);
            }
            _this.find('.slick-active:first').addClass('first-slick');
            _this.find('.slick-active:last').addClass('last-slick');
        });
    }

    /* ---------------------------------------------
     TAB EFFECT
     --------------------------------------------- */
    function dungar_tab_fade_effect() {
        // effect click
        $(document).on('click', '.dungar-tabs .tab-link a', function () {
            var tab_id = $(this).attr('href');
            var tab_animated = $(this).data('animate');

            tab_animated = ( tab_animated === undefined || tab_animated === "" ) ? '' : tab_animated;
            if (tab_animated === "") {
                return false;
            }

            $(tab_id).find('.product-list-owl .owl-item.active, .product-list-grid .product-item').each(function (i) {

                var t = $(this);
                var style = $(this).attr("style");
                style = ( style === undefined ) ? '' : style;
                var delay = i * 400;
                t.attr("style", style +
                    ";-webkit-animation-delay:" + delay + "ms;"
                    + "-moz-animation-delay:" + delay + "ms;"
                    + "-o-animation-delay:" + delay + "ms;"
                    + "animation-delay:" + delay + "ms;"
                ).addClass(tab_animated + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    t.removeClass(tab_animated + ' animated');
                    t.attr("style", style);
                });
            })
        })
    }

    // -------------------------newletter-----------------------------
    function newletter_popup() {
        var window_size = parseFloat(jQuery('body').innerWidth());
        window_size += kt_get_scrollbar_width();
        if (window_size > 991) {
            if ($('body').hasClass('home-newletter')) {
                var _content = $('.kt-popup-newsletter');
                $.magnificPopup.open({
                    items: {
                        src: _content,
                        type: 'inline'
                    }
                });
            }
        }
    }

    // ------------------------Quick view----------------------------------------
    function quickview_popup() {
        var window_size = parseFloat(jQuery('body').innerWidth());
        window_size += kt_get_scrollbar_width();
        if (window_size > 992) {
            $(document).on('click', '.quick-wiew-button', function () {
                $.magnificPopup.open({
                    items: {
                        src: '<div class="kt-popup-quickview "><div class="details-thumb"><div class="slider-product slider-for"><div class="details-item"><img src="assets/images/details-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/details-item-2.jpg" alt="img"></div><div class="details-item"><img src="assets/images/details-item-3.jpg" alt="img"></div><div class="details-item"><img src="assets/images/details-item-4.jpg" alt="img"></div></div><div class="slider-product-button slider-nav nav-center"><div class="details-item"><img src="assets/images/details-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/details-item-2.jpg" alt="img"></div><div class="details-item"><img src="assets/images/details-item-3.jpg" alt="img"></div><div class="details-item"><img src="assets/images/details-item-4.jpg" alt="img"></div></div></div><div class="details-infor"><h1 class="product-title">Homepod Mini</h1><div class="stars-rating"><div class="star-rating"><span class="star-5"></span></div><div class="count-star">(7)</div></div><div class="availability">availability:<a href="#">in Stock</a></div><div class="price"><span>€45</span></div><div class="product-details-description"><ul><li>Vestibulum tortor quam</li><li>Imported</li><li>Art.No. 06-7680</li></ul></div><div class="variations"><div class="attribute attribute_color"><div class="color-text text-attribute">Color:<span>White/</span><span>Black/</span><span>Teal/</span><span>Brown</span></div><div class="list-color list-item"><a href="#" class="color1"></a><a href="#" class="color2"></a><a href="#" class="color3 active"></a><a href="#" class="color4"></a></div></div><div class="attribute attribute_size"><div class="size-text text-attribute">Pots Size:</div><div class="list-size list-item"><a href="#" class="">xs</a><a href="#" class="">s</a><a href="#" class="active">m</a><a href="#" class="">l</a><a href="#" class="">xl</a><a href="#" class="">xxl</a></div></div></div><div class="group-button"><div class="yith-wcwl-add-to-wishlist"><div class="yith-wcwl-add-button"><a href="wishlist.html">Add to 心愿单</a></div></div><div class="quantity-add-to-cart"><div class="quantity"><div class="control"><a class="btn-number qtyminus quantity-minus" href="#">-</a><input type="text" data-step="1" data-min="0" value="1" title="Qty" class="input-qty qty" size="4"><a href="#" class="btn-number qtyplus quantity-plus">+</a></div></div><a href="shoppingcart.html" class="single_add_to_cart_button button">Add to cart</a></div></div></div></div>',
                        type: 'inline'
                    }
                });
                slick_quickview_popup();
                return false;
            });
        }
    }

    function slick_quickview_popup() {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            focusOnSelect: true,
            infinite: true,
            prevArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            nextArrow: '<i class="fa fa-angle-right " aria-hidden="true"></i>'
        });
    }

    // --------------------------------BACK TO TOP-----------------------------
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 1000) {
            $('.backtotop').addClass('show');
        }
        else {
            $('.backtotop').removeClass('show');
        }
    });
    $(document).on('click', 'a.backtotop', function (e) {
        $('html, body').animate({scrollTop: 0}, 800);
        e.preventDefault();
    });
    //---------------------------Price filter----------------------
    $('.slider-range-price').each(function () {
        var min = $(this).data('min');
        var max = $(this).data('max');
        var unit = $(this).data('unit');
        var value_min = $(this).data('value-min');
        var value_max = $(this).data('value-max');
        var label_result = $(this).data('label-result');
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function (event, ui) {
                var result = ' <span>' + unit + ui.values[0] + ' </span>  <span> ' + unit + ui.values[1] + '</span>';
                t.closest('.price-slider-wrapper').find('.price-slider-amount').html(result);
            }
        });
    });
    //----------------Woocommerce plus and minius-------------------------
    $(document).on('click', '.quantity .quantity-plus, .quantity .quantity-minus', function (e) {
        // Get values
        var $qty = $(this).closest('.quantity').find('.qty'),
            currentVal = parseFloat($qty.val()),
            max = parseFloat($qty.attr('max')),
            min = parseFloat($qty.attr('min')),
            step = $qty.attr('step');
        // Format values
        if (!currentVal || currentVal === '' || currentVal === 'NaN') currentVal = 0;
        if (max === '' || max === 'NaN') max = '';
        if (min === '' || min === 'NaN') min = 0;
        if (step === 'any' || step === '' || step === undefined || parseFloat(step) === 'NaN') step = 1;
        // Change the value
        if ($(this).is('.quantity-plus')) {
            if (max && ( max === currentVal || currentVal > max )) {
                $qty.val(max);
            } else {
                $qty.val(currentVal + parseFloat(step));
            }
        } else {
            if (min && ( min === currentVal || currentVal < min )) {
                $qty.val(min);
            } else if (currentVal > 0) {
                $qty.val(currentVal - parseFloat(step));
            }
        }
        // Trigger change event
        $qty.trigger('change');
        e.preventDefault();
    });
//------------------------EQUAL ELEM----------------------------
    function better_equal_elems() {
        setTimeout(function () {
            $('.equal-container').each(function () {
                var $this = $(this);
                if ($this.find('.equal-element').length) {
                    $this.find('.equal-element').css({
                        'height': 'auto'
                    });
                    var elem_height = 0;
                    $this.find('.equal-element').each(function () {
                        var this_elem_h = $(this).height();
                        if (elem_height < this_elem_h) {
                            elem_height = this_elem_h;
                        }
                    });
                    $this.find('.equal-element').height(elem_height);
                }
            });
        }, 1000);
    }
// ------------------owl-thumbs-----------------------------------------------
    function init_carousel() {
        //owl has thumbs
        $('.owl-carousel.has-thumbs').owlCarousel({
            loop: true,
            items: 1,
            thumbs: true,
            thumbImage: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item'
        });
        // owl config
        $(".owl-carousel").each(function (index, el) {
            var config = $(this).data();
            config.navText = ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'];
            var animateOut = $(this).data('animateout');
            var animateIn = $(this).data('animatein');
            var slidespeed = parseFloat($(this).data('slidespeed'));

            if (typeof animateOut !== 'undefined') {
                config.animateOut = animateOut;
            }
            if (typeof animateIn !== 'undefined') {
                config.animateIn = animateIn;
            }
            if (typeof (slidespeed) !== 'undefined') {
                config.smartSpeed = slidespeed;
            }

            if ($('body').hasClass('rtl')) {
                config.rtl = true;
            }

            var owl = $(this);
            owl.on('initialized.owl.carousel', function (event) {
                var owl_length = owl.find('.owl-item.active').length;
                var total_active = parseInt(owl_length, 10);
                var i = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function () {
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i === 1) {
                            $(this).addClass('item-first');
                        }
                        if (i === total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
            });
            owl.on('refreshed.owl.carousel', function (event) {
                var owl_length = owl.find('.owl-item.active').length;
                var total_active = parseInt(owl_length, 10);
                var i = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function () {
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i === 1) {
                            $(this).addClass('item-first');
                        }
                        if (i === total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
            });
            owl.on('change.owl.carousel', function (event) {
                var owl_length = owl.find('.owl-item.active').length;
                var total_active = parseInt(owl_length, 10);
                var i = 0;
                owl.find('.owl-item').removeClass('item-first item-last');
                setTimeout(function () {
                    owl.find('.owl-item.active').each(function () {
                        i++;
                        if (i === 1) {
                            $(this).addClass('item-first');
                        }
                        if (i === total_active) {
                            $(this).addClass('item-last');
                        }
                    });

                }, 100);
                owl.addClass('owl-changed');
                setTimeout(function () {
                    owl.removeClass('owl-changed');
                }, config.smartSpeed)
            });
            owl.on('drag.owl.carousel', function (event) {
                owl.addClass('owl-changed');
                setTimeout(function () {
                    owl.removeClass('owl-changed');
                }, config.smartSpeed)
            });
            owl.owlCarousel(config);
            // Sections backgrounds
            if ($(window).width() < 992) {
                var itembackground = $(".item-background");
                itembackground.each(function (index) {
                    if ($('.item-background').attr("data-background")) {
                        $(this).css("background-image", "url(" + $(this).data("background") + ")");
                        $(this).css("height", $(this).closest('.owl-carousel').data("height") + 'px');
                        $('.slide-img').css("display", 'none');
                    }
                });
            }
        });
    }

    // --------------------------------------------------------------------------
    function kt_get_scrollbar_width() {
        var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
            $outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
            inner = $inner[0],
            outer = $outer[0];
        jQuery('body').append(outer);
        var width1 = parseFloat(inner.offsetWidth);
        $outer.css('overflow', 'scroll');
        var width2 = parseFloat(outer.clientWidth);
        $outer.remove();
        return (width1 - width2);
    }

    // -----------------------------mega-menu------------------
    function kt_resizeMegamenu() {
        var window_size = parseFloat(jQuery('body').innerWidth());
        window_size += kt_get_scrollbar_width();
        if (window_size > 990) {
            if ($('.container-wapper .main-menu').length > 0) {
                var container = $('.main-menu-wapper');
                if (container !== 'undefined') {
                    var container_width = 0;
                    container_width = parseFloat(container.innerWidth());
                    var container_offset = 0;
                    container_offset = container.offset();
                    setTimeout(function () {
                        $('.main-menu .menu-item-has-children').each(function (index, element) {
                            $(element).children('.mega-menu').css({'width': container_width + 'px'});
                            var sub_menu_width = parseFloat($(element).children('.mega-menu').outerWidth());
                            var item_width = parseFloat($(element).outerWidth());
                            $(element).children('.mega-menu').css({'left': '-' + (sub_menu_width / 2 - item_width / 2) + 'px'});
                            var container_left = container_offset.left;
                            var container_right = (container_left + container_width);
                            var item_left = $(element).offset().left;
                            var overflow_left = (sub_menu_width / 2 > (item_left - container_left));
                            var overflow_right = ((sub_menu_width / 2 + item_left) > container_right);
                            if (overflow_left) {
                                var left = (item_left - container_left);
                                $(element).children('.mega-menu').css({'left': -left + 'px'});
                            }
                            if (overflow_right && !overflow_left) {
                                var left = (item_left - container_left);
                                left = left - ( container_width - sub_menu_width );
                                $(element).children('.mega-menu').css({'left': -left + 'px'});
                            }
                        })
                    }, 100);
                }
            }
        }
    }

    // -----------------count down years months -------------------------------
    function dungar_countdown() {
        if ($('.dungar-countdown').length > 0) {
            var labels = ['Years', 'Months', 'Weeks', '天', 'Hrs', 'Mins', 'Secs'];
            var layout = '<span class="box-count day"><span class="number">{dnn}</span> <span class="text">天</span></span><span class="box-count hrs"><span class="number">{hnn}</span> <span class="text">Hrs</span></span><span class="box-count min"><span class="number">{mnn}</span> <span class="text">Mins</span></span><span class="box-count secs"><span class="number">{snn}</span> <span class="text">Secs</span></span>';
            $('.dungar-countdown').each(function () {
                var austDay = new Date($(this).data('y'), $(this).data('m') - 1, $(this).data('d'), $(this).data('h'), $(this).data('i'), $(this).data('s'));
                $(this).countdown({
                    until: austDay,
                    labels: labels,
                    layout: layout
                });
            });
        }
    }
    // --------------------------------------------------------
    $(window).on('scroll', function () {
        dungar_custom_scrollbar();
    });
    $(window).on("resize", function () {
        better_equal_elems();
        quickview_popup();
        kt_resizeMegamenu();
        dungar_remove_class_review();
        dungar_details_thumd_zoom();
        dungar_custom_scrollbar();
    });
    $(window).on("load", function () {
        better_equal_elems();
        newletter_popup();
        quickview_popup();
        dungar_mobile_block();
        dungar_remove_class_review();
        dungar_custom_scrollbar()
    });
    init_carousel();
    dungar_dropdown();
    dungar_init_carousel();
    dungar_remove_class_review();
    dungar_tab_fade_effect();
    dungar_details_thumd_zoom();
    dungar_video();
    kt_resizeMegamenu();
    dungar_custom_scrollbar();
    dungar_countdown();
    dungar_init_menu_toggle();
    dungar_custom_scrollbar_header_nav();
})(jQuery); // End of use strict