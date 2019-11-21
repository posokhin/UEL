$(document).ready(function(){
    /* calc */
    $('.range').each(function(){
        var min = $(this).attr('min');
        var max = $(this).attr('max');
        var self = $(this);
        $(this).ionRangeSlider({
            min: min,
            max: max,
            hide_from_to: true,
            hide_min_max: true,
            extra_classes: 'selection__calc-range-item-input-slider-range',
            onChange: function(){
                var value = self.data().from;
                self.closest('.selection__calc-range-item-input').find('input').val(value);
            }
        });
    });

    $('.selection__calc-rooms label, .selection__calc-checkbox-item-sublist-item label').on('click', function(e){
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
    /* calc end */

    /* slider-main */
    if($('.primary__right-slider').length){
        var sliderPrimaryThumb = new Swiper('.primary__right-slider', {
            slidesPerView: 3,
            slideToClickedSlide: true,
            allowTouchMove: false,
            on: {
                click: function(){
                    progressStart();
                } 
            }
        });
    }
    if($('.primary__right-top-container').length){
        var sliderPrimary = new Swiper('.primary__right-top-container', {
            thumbs: {
                swiper: sliderPrimaryThumb
            },
            pagination: {
                el: '.primary__right-top-pagination',
                type: 'bullets',
                clickable: true
            },
            allowTouchMove: false,
            loop: true,
            speed: 500,
            on: {
                init: function(){
                    progressStart();
                } 
            }
        });
        var progresbarLine = $('.primary__right-slider-item.swiper-slide-thumb-active .primary__right-slider-item-progress span');
        function progressStart(){
            changeTextSlider();
            var autoplay = 7000;
            progressStop();
            progresbarLine.animate({
                width: 100 + '%'
            },autoplay,function(){
                sliderPrimary.slideNext();
                progressStop();
                progressStart();
            });
        }
        function progressStop(){
            progresbarLine = $('.primary__right-slider-item.swiper-slide-thumb-active .primary__right-slider-item-progress span');
            progresbarLine.stop(true);
            $('.primary__right-slider-item-progress span').stop(true);
            $('.primary__right-slider-item-progress span').css({
                width: 0
            });
        }
        function changeTextSlider(){
            var title = $('.primary__left-title');
            var itemTitle = $('.primary__right-slider-item.swiper-slide-thumb-active .primary__right-slider-item-title').text();
            title.addClass('fadeInLeft').text(itemTitle);
            var timer = setTimeout(function(){
                title.removeClass('fadeInLeft');
            },1000);
        }
        if($('.sliderPrimaryThumb').length){
            $(window).on('load',function(){
                if($(window).width() <= 768){
                    sliderPrimaryThumb.destroy(false); 
                    sliderPrimaryThumb.detachEvents(); 
                    progressStop();
                }
            });
        }
    }
    /* slider-main end */

    /* video reviews */
    var video = document.querySelector('.reviews__current-video video');
    var videoItem = $('.reviews__right-item');
    var videoCurrent = $('.reviews__current-video video');
    var videoCurrentName = $('.reviews__current-name');
    var playButton = $('.reviews__current-video i');
    playButton.on('click', function(){
        video.play();
        $(this).hide();
    });
    videoItem.on('click', function(e){
        var videoItemSource = $(this).attr('data-video');
        var videoItemPoster = $(this).attr('data-poster');
        var videoItemName = $(this).find('.reviews__right-item-name').text();
        videoCurrent.hide(function(){
            $(this).attr('src', videoItemSource).attr('poster', videoItemPoster).show();
            playButton.show();
            videoCurrentName.text(videoItemName);
        });
        /* videoCurrent.attr('poster', videoItemPoster); */
    });
    /* video reviews end*/

    /* search */
    function openSearch(){
        $('.header__search-wrapper').addClass('open');
        $('.header__search form input').focus();
    }
    function closeSearch(){
        $('.header__search-wrapper').removeClass('open');
    }
    $('.header__search-btn').on('click', openSearch);
    $('.header__search-close').click(closeSearch);
    /* search end */

    /* catalog menu */
    function openCatalogMenu(){
        $('.header-submenu__wrapper').addClass('open');
    }
    function closeCatalogMenu(){
        $('.header-submenu__wrapper').removeClass('open');
    }
    function setLeftArrowCatalogMenu(){
        var coords = $('.js-open-catalog-menu').offset().left;
        $('.header-submenu__arrow').css({
            left: coords+40+'px'
        });
    }
    $('.js-open-catalog-menu, .header-submenu__wrapper').on('mouseenter', function(){
        openCatalogMenu();
        setLeftArrowCatalogMenu();
        if($('.header-submenu__wrapper').hasClass('open')){
            $('.js-open-catalog-menu').addClass('active');
        }
    });
    $('.js-open-catalog-menu, .header-submenu__wrapper').on('mouseleave', function(){
        if($('.header-submenu__wrapper').hasClass('open')){
            $('.js-open-catalog-menu').removeClass('active');  
        }
        closeCatalogMenu();
    });
    $(window).resize(function(){
        setLeftArrowCatalogMenu();
    });
    /* catalog menu end */
    
    /* detail slider */
    var previewDetailSlider = new Swiper('.js-preview-detail', {
        navigation: {
            nextEl: '.detail-preview__arrow--bottom',
            prevEl: '.detail-preview__arrow--top',
        },
        direction: 'vertical',
        slidesPerView: 3,
        spaceBetween: 40,
        breakpoints: {
            320: {
                direction: 'horizontal',
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1400: {
                direction: 'vertical',
                slidesPerView: 3,
            }
        }
    });
    var previewDetailSlider = new Swiper('.js-current-detail', {
        slidesPerView: 1,
        thumbs: {
            swiper: previewDetailSlider
        },
    });
    /* detail slider end */

    /* tabs */
    $('.js-detail-tabs').on('click', '.detail-tabs__item:not(.detail-tabs__item active)', function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active').closest('.detail-tabs__wrapper').siblings('.detail-tabs-content').find('.detail-tabs-content__item').removeClass('active').eq($(this).index()).addClass('active');
    });
    /* tabs end */

    /* form */
    function showResultForm(e){
        e.preventDefault();
        $('.form').addClass('hide');
        $('.form-send').addClass('show');
    }
    $('.js-send-form').on('click', showResultForm);
    /* form end */

    /* service-list map */
    function openMap(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).closest('.service__item').find('.service__map').slideToggle();
        $(this).closest('.service__item').siblings().find('.service__map').slideUp();
    }
    $('.js-open-map').click(openMap);
    /* service-list map end */

    /* service-tabs */
    $('.service-tabs').on('click', '.service-tabs__item:not(.service-tabs__item active)', function(e){
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active').closest('.service__content-top').siblings('.service-tabs__content').find('.service-tabs__content-item').removeClass('active').eq($(this).index()).addClass('active');
    });
    /* service-tabs end */

    /* slider banner */
    var bannerProgress = $('.banner__pagination-item.swiper-slide-thumb-active .banner__pagination-progress span');
    function bannerProgressStart(){
        var autoplay = 7000;
        bannerProgressStop();
        bannerProgress.animate({
            width: 100 + '%'
        },autoplay,function(){
            sliderBanner.slideNext();
            bannerProgressStop();
            bannerProgressStart();
        });
    }
    function bannerProgressStop(){
        bannerProgress = $('.banner__pagination-item.swiper-slide-thumb-active .banner__pagination-progress span');
        bannerProgress.stop(true);
        $('.banner__pagination-item .banner__pagination-progress span').stop(true);
        $('.banner__pagination-item .banner__pagination-progress span').css({
            width: 0
        });
    }

    var sliderBannerThumb= new Swiper('.js-banner-pagination', {
        slidesPerView: 3,
        slideToClickedSlide: true,
        allowTouchMove: false,
        on: {
            click: function(){
                bannerProgressStart();
            } 
        }
    });
    
    var sliderBanner = new Swiper('.js-banner-slider', {
        thumbs: {
            swiper: sliderBannerThumb
        },
        allowTouchMove: false,
        loop: true,
        speed: 500,
        on: {
            init: function(){
                bannerProgressStart();
            } 
        }
    });
    /* slider banner end */
});