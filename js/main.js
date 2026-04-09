'use strict';

$(document).ready(function () {

    /* Declaration Of Mouse Cursor Variables */
    const MathUtils = {
        lineEq: (y2, y1, x2, x1, currentVal) => {
            // y = mx + b
            var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
            return m * currentVal + b;
        },
        lerp: (a, b, n) => (1 - n) * a + n * b
    };
    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
    window.addEventListener('resize', calcWinsize);
    const getMousePos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        } else if (ev.clientX || ev.clientY) {
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        return {x: posx, y: posy};
    };
    let mousePos = {x: winsize.width / 2, y: winsize.height / 2};
    window.addEventListener('mousemove', ev => mousePos = getMousePos(ev));

    /* Declaration Of Counter Variables */
    let counter = 0,
        c = 0,
        i = setInterval(function () {
            $('.loading-page .counter h1').html(c);
            $('.loading-page').css('width', c + '%');
            counter++;
            c++;
            if (counter == 101) {
                clearInterval(i);
            }
        },);

    /* Declaration Of Main Variables */
    let general = {
            w: $(window).innerWidth(),
            h: $(window).innerHeight(),
            body: $('body'),
            doc: document,
            win: window,
            offsetY: window.pageYOffset
        },
        loader = $('.page-loader');

    $(general.win).scroll(() => {
        general.offsetY = general.win.pageYOffset;
    });


    /* Animation Element Init */
    let setPreviewAnimation = () => {
        let waypoints = $('.animation-element').waypoint(function (direction) {
            let obj = $(this);
            $(obj[0].element).addClass('animate-element');
        }, {
            offset: '100%'
        });
    };


    /* Navigation Items Animation Init */
    let startAppear = () => {
        let heroHeader = $('.hero-header'),
            navigationMenu = $('.navigation-menu'),
            navigationButtons = navigationMenu.find('.navigation-button');

        TweenMax.staggerTo(navigationButtons, 1, {
            transform: 'translateY(0)',
            opacity: 1,
            ease: Expo.easeInOut
        }, 0.15);
    };


    /* Parallax Footer Init */
    let fixedFooter = () => {
        let footer = $('footer'),
            height = footer.outerHeight(true);

        general.body.append('<div class="footer-sizer"></div>');

        $('.footer-sizer').css('height', `${height}px`);
    };

    $(general.win).resize(() => {
        general.w = $(window).innerWidth();
        general.h = $(window).innerHeight();
    });

    /* [0] NAVIGATION Class */
    class NAVIGATION {
        /* (1) Constructor */
        constructor() {
            this.navigationMenu = $('.navigation-menu');
            this.sidebarToggle = this.navigationMenu.find('.navigation-menu--sidebar-toggle');
            this.sidebarPanel = this.navigationMenu.find('.navigation--sidebar-panel');
            this.sidebarCloseToggle = this.navigationMenu.find('.sidebar-panel-toggle-close');
        }

        /* (1.1)  Menu Toggle Panel And Menu Items Animation */
        _navigationPanel() {
            let t1 = new TimelineMax({paused: true});
            t1.to(".wrapper-toggles--one", 0.5, {
                y: 6,
                rotation: 45,
                ease: Expo.easeInOut
            });
            t1.to(".wrapper-toggles--two", 0.5, {
                y: -2,
                rotation: -45,
                ease: Expo.easeInOut,
                delay: -0.5
            });
            t1.to(".wrapper-toggles--three", 0.5, {
                scale: 0.1,
                opacity: 0,
                ease: Expo.easeInOut,
                delay: -0.5
            });
            t1.to(".navigation-menu--inner-wrapper", 0.8, {
                transform: "translate(0%)",
                ease: Expo.easeInOut,
                delay: -1.2
            });
            t1.staggerFrom(".menu-item", 0.8, {
                x: -200,
                opacity: 0,
                ease: Expo.easeOut
            }, 0.2);

            t1.reverse();
            $(document).on("click", ".navigation-menu--toggle-btn", function () {
                t1.reversed(!t1.reversed());
            });
            $(document).on("click", "navigation-menu--toggle-btn", function () {
                t1.reversed(!t1.reversed());
            });
        }

        /* (1.2) Side Panel */
        _sidebarPanel() {
            let openAnim = TweenMax.to(this.sidebarPanel, 0.6, {
                transform: 'translateX(0)',
                ease: Expo.easeInOut
            }).reverse();
            this.sidebarToggle.on('click', function () {
                openAnim.play();
            });
            this.sidebarCloseToggle.on('click', function () {
                openAnim.reverse();
            });
        }
    }

    /* [1] FUNCTIONS Class */
    class FUNC {
        /* (1) Constructor */
        constructor() {
            this.wrapperSlider = $('.swiper-hero');
            this.wrapperSlidertype2 = $('.swiper-hero-type-2');
            this.testimonialsSlider = $('.swiper-testimonials');
            this.testimonialsSliderType2 = $('.testimonials-slider-type-2');
            this.swiperPortfolioType1 = $('.portfolio-swiper-type-1');
            this.tiltWrapper = $('.tilt-wrapper');
            this.video_modal = $('.video-popup');
            this.clientSliderType1 = $('.clients-container-type-1');
            this.accordions = $('.accordion-wrapper');
            this.swiperTeamType1 = $('.swiper-team-type-1');
            this.isotope_grid_masonry = $('.grid');
            this.buttonsGroup = $('.buttons-sort');
            this.formAjax = $('#ajax-contact');
            this.accordionGallery = $('.accordion-gallery');
            this.gallery = $('.popup-gallery');
            this.image_modal = $('.image-popup');
            this.tabsWrapper = $('.tabs--tabs-wrapper');
            this.backgroundSlider = $('.swiper-background');
            this.videoPost = general.doc.querySelectorAll('.post-video-wrapper');
            this.counters = $('.counters-list-wrapper');
        }

        /* (1.1) Swiper Coverflow Init */
        func_swiperCoverflow() {
            if ($(this.wrapperSlider).length) {
                let swiper = new Swiper(this.wrapperSlider, {
                    loop: true,
                    speed: 1200,
                    effect: 'coverflow',
                    grabCursor: true,
                    coverflowEffect: {
                        rotate: 35,
                        stretch: 10,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next-default',
                        prevEl: '.swiper-button-prev-default',
                    }
                });
            }
            if ($(this.wrapperSlidertype2).length) {
                let swipertype2 = new Swiper(this.wrapperSlidertype2, {
                    speed: 2000,
                    parallax: true,
                    grabCursor: true,
                    navigation: {
                        nextEl: '.swiper-button-next-about',
                        prevEl: '.swiper-button-prev-about',
                    }
                });
            }
        }

        /* (1.2) Counters Init */
        func_counters() {
            $(this.counters).each(function () {
                let $this = $(this),
                    counterBox = $this.find('.inner-wrapper--counter-wrapper'),
                    counterConfig = {score: 0},
                    animationType = $this.data('animation-type'),
                    animationDuration = Number($this.data('animation-duration'));
                $this.waypoint(() => {
                    if (!$($this).hasClass('finished-count')) {
                        $this.addClass('finished-count');
                        $(counterBox).each(function () {
                            let $this = $(this),
                                counterValue = $this.find('.counter--value'),
                                updateHandler = () => {
                                    counterValue.text(counterConfig.score);
                                },
                                counter = () => {
                                    TweenMax.to(counterConfig, animationDuration, {
                                        score: counterValue.data('counter-value'),
                                        roundProps: "score",
                                        onUpdate: updateHandler,
                                        ease: Linear.easeInOut,
                                    }).play();
                                    if (animationType === 'fade') {
                                        TweenMax.to(counterValue, animationDuration, {
                                            opacity: 1,
                                            ease: Linear.easeInOut,
                                        }).play();
                                    }
                                };
                            counter();
                        });
                    }
                }, {
                    offset: '85%'
                });
            });
        }

        /* (1.3) Blog Video Init */
        func_blogVideoPost() {
            for (let i = 0; i < this.videoPost.length; i++) {
                const player = new Plyr(this.videoPost[i], {
                    controls: ['play-large', 'play', 'progress', 'current-time', 'airplay', 'fullscreen'],
                });
            }
        }

        /* (1.4) Background Slider */
        func_backgroundSlider() {
            if ($(this.backgroundSlider).length) {
                let backgroundSlider1 = new Swiper(this.backgroundSlider, {
                    loop: true,
                    grabCursor: true,
                    autoplay: {
                        delay: 2000,
                    },
                });
            }
        }

        /* (1.5) Swiper Text Init */
        func_swiperText() {
            if ($(this.testimonialsSlider).length) {
                let testimonialsSlider = new Swiper(this.testimonialsSlider, {
                    effect: 'slide',
                    grabCursor: true,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    autoplay: {
                        delay: 3000
                    },
                    breakpoints: {
                        991: {
                            spaceBetween: 15,
                        },
                    }
                });
            }
            if ($(this.testimonialsSliderType2).length) {
                let testimonialsSlider2 = new Swiper(this.testimonialsSliderType2, {
                    slidesPerView: 3,
                    spaceBetween: 50,
                    grabCursor: true,
                    effect: 'slide',
                    centeredSlides: true,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        waitForTransition: true,
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 2,
                        },
                        767: {
                            slidesPerView: 1,
                            centeredSlides: false,
                        },
                    }
                });
            }
        }

        /* (1.6) Swiper Portfolio Init */
        func_swiperPortfolio() {
            if ($(this.swiperPortfolioType1).length) {
                let swiperPorfolio = new Swiper(this.swiperPortfolioType1, {
                    loop: true,
                    speed: 1200,
                    spaceBetween: 15,
                    slidesPerView: 2,
                    navigation: {
                        nextEl: '.swiper-button-next-item',
                        prevEl: '.swiper-button-prev-item',
                    },
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: true
                    },
                    breakpoints: {
                        575: {
                            slidesPerView: 1,
                        },
                    }
                });
            }
        }

        /* (1.7) Tilt Init */
        func_tilt() {
            if ($(this.tiltWrapper).length) {
                $(this.tiltWrapper).each(function () {
                    let $this = $(this);
                    $this.tilt({
                        maxTilt: $this.data('tilt-value'),
                        perspective: $this.data('tilt-perspective'),
                        easing: "cubic-bezier(.03,.98,.52,.99)",
                        scale: $this.data('tilt-scale'),
                        speed: $this.data('tilt-speed'),
                        transition: true,
                        disableAxis: null,
                        reset: true,
                        glare: false,
                        maxGlare: 0.05
                    });
                });
            }
        }

        /* (1.8) Video Modal Init */
        func_videoModalInit() {
            for (let i = 0; i < this.video_modal.length; i++) {
                this.video_modal.magnificPopup({
                    type: 'inline',
                    closeOnContentClick: true,
                    mainClass: 'mfp-fade',
                    modal: true,
                    closeBtnInside: true,
                });
                $('.modal-video-box').on('click', function (e) {
                    $.magnificPopup.close();
                });
            }
        }

        /* (1.9) Swiper Client Init */
        func_swiperClient() {
            if ($(this.clientSliderType1).length) {
                let clientsSlider1 = new Swiper(this.clientSliderType1, {
                    slidesPerView: 5,
                    loop: true,
                    speed: 1000,
                    grabCursor: true,
                    autoplay: {
                        delay: 3200,
                        disableOnInteraction: true
                    },
                    breakpoints: {
                        1400: {
                            slidesPerView: 4,
                        },
                        991: {
                            slidesPerView: 3,
                        },
                        767: {
                            slidesPerView: 2,
                        },
                        575: {
                            slidesPerView: 1,
                        }
                    }
                });
            }
        }

        /* (1.10) Accordions Init */
        func_accordions() {
            let duration = 0.4,
                openAccordion = (item, height, icon) => {
                    TweenMax.to(item, duration, {
                        height: height + 'px',
                        ease: Power1.ease
                    }).play();
                },
                closeAccordion = (item, icon) => {
                    TweenMax.to(item, duration, {
                        height: 0,
                        ease: Power1.ease
                    }).play();
                };
            $(this.accordions).each(function () {
                let $this = $(this),
                    accordionItem = $this.find('.content-list--accordion'),
                    accordionTitle = accordionItem.find('.accordion--title'),
                    accordionContent = accordionItem.find('.accordion--content'),
                    resizeAccordion = () => {
                        let innerAccordionContent = $('.active-accordion').find('.accordion--content'),
                            height = innerAccordionContent.find('.content--inner-wrapper').outerHeight(true);
                        $(general.win).on('resize', function () {
                            let innerAccordionContent = $('.active-accordion').find('.accordion--content'),
                                height = innerAccordionContent.find('.content--inner-wrapper').outerHeight(true);
                            openAccordion(innerAccordionContent, height);
                        });
                        openAccordion(innerAccordionContent, height);
                    };

                accordionTitle.on('click', function () {
                    let $this = $(this),
                        innerAccordionContent = $this.parent().find('.accordion--content'),
                        height = innerAccordionContent.find('.content--inner-wrapper').outerHeight(true);
                    if (!$this.parent().hasClass('active-accordion')) {
                        accordionItem.removeClass('active-accordion');
                        $this.parent().addClass('active-accordion');
                        closeAccordion(accordionContent);
                        openAccordion(innerAccordionContent, height);
                    } else {
                        $this.parent().removeClass('active-accordion');
                        closeAccordion(accordionContent);
                    }
                });

                resizeAccordion();
            });
        }

        /* (1.11) Swiper Team Init */
        func_swiperTeam() {
            if ($(this.swiperTeamType1).length) {
                let swiper_team1 = new Swiper(this.swiperTeamType1, {
                    loop: true,
                    speed: 1200,
                    spaceBetween: 15,
                    slidesPerView: 4,
                    grabCursor: true,
                    autoplay: {
                        delay: 3200
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 3,
                        },
                        991: {
                            slidesPerView: 2,
                        },
                        575: {
                            slidesPerView: 1,
                        }
                    }
                });
            }
        }

        /* (1.12) Isotope Grid Init */
        func_isotopeGridInit() {
            if (this.isotope_grid_masonry.length) {
                let grid = this.isotope_grid_masonry.isotope({
                    itemSelector: '.grid--grid-item',
                    transitionDuration: this.isotope_grid_masonry.data('grid-transition') + 's',
                    stagger: this.isotope_grid_masonry.data('grid-stagger'),
                    layoutMode: this.isotope_grid_masonry.data('grid-layout-mode')
                });
                let buttons = $(this.buttonsGroup).find('button, p');
                this.buttonsGroup.on('click', 'button, p', function () {
                    $(buttons).removeClass('active-button');
                    $(this).addClass('active-button');
                    let filter_value = $(this).attr('data-filter');
                    grid.isotope({
                        filter: filter_value
                    });
                });
            }
        }

        /* (1.13) Ajax Contact Form Init */
        func_ajaxContactForm() {
            $(this.formAjax).submit(function (e) {
                e.preventDefault();
                let form_data = $(this).serialize();
                $.ajax({
                    type: "POST",
                    url: "mailer.php",
                    data: form_data,
                    success: function () {
                        alert("Your message send");
                    }
                });
            });
        }

        /* (1.14) Accordion Gallery Init */
        func_accordionGallery() {
            let items = this.accordionGallery.find('.items-wrapper--item'),
                count = items.length,
                openWidth = 60,
                closeWidth = (100 - openWidth) / (count - 1),
                sizer = this.accordionGallery.find('.items-wrapper--item-sizer'),
                images = items.find('.image-wrapper--image-inner'),
                setImagesWidth = () => {
                    sizer.css('min-width', openWidth + '%');
                    let width = sizer.outerWidth(true);
                    images.css('width', width);
                },
                showContentAnimation = (showElem) => {
                    let content = $(showElem).find('.content-wrapper--content');
                    TweenMax.to(content, 0.5, {
                        top: '0',
                        opacity: 1,
                        ease: Power1.easeInOut,
                    }).play();
                },
                openItemAnimation = (showElem) => {
                    if (general.w > 1023) {
                        TweenMax.to(showElem, 0.5, {
                            minWidth: openWidth + '%',
                            maxWidth: openWidth + '%',
                            width: openWidth + '%',
                            ease: Power1.easeInOut,
                        }).play();
                    } else {
                        TweenMax.to(showElem, 0.5, {
                            minHeight: '400px',
                            maxHeight: '400px',
                            height: '400px',
                            ease: Power1.easeInOut,
                        }).play();
                    }
                    $(showElem).addClass('active-item');
                    showContentAnimation(showElem);
                },
                toggleItemsAnimation = (hideElem, showElem) => {
                    let content = $(hideElem).find('.content-wrapper--content');
                    TweenMax.to(content, 0.5, {
                        top: '20',
                        opacity: 0,
                        ease: Power1.easeInOut,
                    }).play();
                    if (general.w > 1023) {
                        TweenMax.to(hideElem, 0.5, {
                            minWidth: closeWidth + '%',
                            maxWidth: closeWidth + '%',
                            width: closeWidth + '%',
                            ease: Power1.easeInOut,
                        }).play();
                    } else {
                        TweenMax.to(hideElem, 0.5, {
                            minHeight: '150px',
                            maxHeight: '150px',
                            height: '150px',
                            ease: Power1.easeInOut,
                        }).play();
                    }
                    hideElem.removeClass('active-item');
                    openItemAnimation(showElem);
                };
            $(items[0]).addClass('active-item');
            let activeItem = this.accordionGallery.find('.active-item');
            openItemAnimation(activeItem);
            let resizeResponsive = () => {
                activeItem = this.accordionGallery.find('.active-item');
                if (general.w > 1023) {
                    setImagesWidth();
                    items.not(activeItem).css({
                        'width': closeWidth + '%',
                        'min-width': closeWidth + '%',
                        'max-width': closeWidth + '%',
                    });
                    TweenMax.to($(activeItem), 0.3, {
                        minWidth: openWidth + '%',
                        minHeight: '400px',
                        ease: Power1.easeInOut,
                    });
                    items.css({
                        'height': '600px',
                        'min-height': '600px',
                        'max-height': '600px',
                    });
                    activeItem.css({})
                } else {
                    items.css({
                        'height': '150px',
                        'min-height': '150px',
                        'max-height': '150px',
                        'width': '100%',
                        'min-width': '100%',
                        'max-width': '100%',
                    });
                    TweenMax.to($(activeItem), 0.3, {
                        minHeight: '400px',
                        maxHeight: '400px',
                        height: '400px',
                        ease: Power1.easeInOut,
                    });
                }
            };
            resizeResponsive();
            $(general.win).on('resize', () => {
                resizeResponsive();
            });
            items.on('click', function () {
                toggleItemsAnimation($('.active-item'), $(this));
            });
        }

        /* (1.15) ImageModal Init */
        func_imageModalInit() {
            for (let i = 0; i < this.image_modal.length; i++) {
                this.image_modal.magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    mainClass: 'mfp-fade',
                    image: {
                        verticalFit: true
                    },
                });
            }
        }

        /* (1.16) Gallery Init */
        func_galleryInit() {
            for (let i = 0; i < this.gallery.length; i++) {
                this.gallery.magnificPopup({
                    delegate: '.image-item',
                    type: 'image',
                    tLoading: 'Loading image #%curr%...',
                    removalDelay: 400,
                    mainClass: 'mfp-fade',
                    fixedContentPos: false,
                    zoom: {
                        enabled: true,
                        duration: 400,
                        easing: 'ease'
                    },
                    gallery: {
                        enabled: true,
                        navigateByImgClick: true,
                        preload: [1, 1],
                        tPrev: 'Previous',
                        tNext: 'Next'
                    },
                    image: {
                        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                        titleSrc: function (item) {
                            return item.el.attr('title');
                        }
                    },
                });
            }
        }

        /* (1.17) Tabs Init */
        func_tabs() {
            let tabsWrapper = this.tabsWrapper,
                tabsHeader = tabsWrapper.find('.header-wrapper--header'),
                tab = tabsWrapper.find('.content-wrapper--tab'),
                animationType = tabsWrapper.data('tabs-animation-type');

            $(tab).each(function () {
                let $this = $(this),
                    data = $this.data('tabs-tab-title'),
                    index = $this.index() + 1,
                    tabClass = 'content-wrapper--tab-' + index;
                tabsHeader.append('<li class="header--item" data-tab-item-active="' + '.' + tabClass + '"><h6 class="item--title">' + data + '</h6></li>');
                $this.addClass(tabClass);
            });

            let tabsHeaderItems = tabsHeader.find('.header--item'),
                activeItem = $(tabsHeaderItems[0]).addClass('header--item-active'),
                activeContent = $(tab[0]).addClass('content-wrapper--tab-active'),
                openTabAnimation = () => {
                    tabsHeaderItems.on('click', function () {
                        let $this = $(this),
                            activeContent = tabsWrapper.find('.content-wrapper--tab-active'),
                            itemClass = $this.data('tab-item-active');
                        TweenMax.to(activeContent, 0.2, {
                            pointerEvents: 'none',
                            opacity: 0,
                            transform: 'scale(0.98)',
                            ease: Linear.easeInOut,
                            onComplete: () => {
                                TweenMax.to($(itemClass), 0.2, {
                                    pointerEvents: 'auto',
                                    opacity: 1,
                                    transform: 'scale(1)',
                                    ease: Linear.easeInOut,
                                    onComplete: () => {
                                        tab.removeClass('content-wrapper--tab-active');
                                        $(itemClass).addClass('content-wrapper--tab-active');
                                    }
                                }).play();
                            }
                        }).play();
                    });
                };

            if (animationType === 'line-fill') {
                let underline = tabsHeader.find('.header--underline-fill');
                let startUnderline = () => {
                        let width = activeItem.outerWidth(true);
                        underline.css({
                            'width': width,
                            'height': '100%'
                        });
                    },
                    setUnderlineAnimation = (width, activeItem, onStartAnimation) => {
                        TweenMax.to(underline, 0.2, {
                            left: width,
                            width: $(activeItem).outerWidth(true),
                            ease: Linear.easeInOut,
                            onComplete: () => {
                                tabsHeaderItems.css('pointer-events', 'auto');
                                TweenMax.to(underline, 0.2, {
                                    height: '100%',
                                    ease: Linear.easeInOut,
                                    onStart: () => {
                                        onStartAnimation();
                                    }
                                });
                            }
                        }).play();
                    },
                    toggleUnderlineAnimation = (width, activeItem, onStartAnimation) => {
                        tabsHeaderItems.css('pointer-events', 'none');
                        TweenMax.to(underline, 0.2, {
                            height: 2,
                            ease: Linear.easeInOut,
                            onComplete: () => {
                                setUnderlineAnimation(width, activeItem, onStartAnimation);
                            }
                        }).play();
                    };
                startUnderline();
                tabsHeaderItems.on('click', function () {
                    let $this = $(this),
                        index = $this.index(),
                        width = 0,
                        onStartAnimation = () => {
                            $this.addClass('header--item-active');
                        };

                    for (let i = 0; i < index - 1; i++) {
                        width += $(tabsHeaderItems[i]).outerWidth(true);
                    }
                    if (!$this.hasClass('header--item-active')) {
                        $(tabsHeaderItems).not($this).removeClass('header--item-active');
                        toggleUnderlineAnimation(width, $this, onStartAnimation);
                    }
                });
            }

            openTabAnimation();
        }

        /* (1.18) Sticky Sidebar Init */
        func_stickySidebar() {
            let sidebar = $('.sticky-sidebar , .sticky-content ');
            if (sidebar.length) {
                sidebar.theiaStickySidebar({
                    additionalMarginTop: 120,
                    additionalMarginBottom: 40
                });
            }
        }

    }

    /* [2] CURSOR Class */
    class CURSOR {
        /* (1) Constructor */
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.toggle = this.DOM.el.querySelector('.cursor--inner-circle');

            this.DOM.title = this.DOM.el.querySelector('.cursor--inner-text');
            this.bounds = {
                toggle: this.DOM.toggle.getBoundingClientRect(),
                title: this.DOM.title.getBoundingClientRect()
            };
            this.lastMousePos = {
                toggle: {x: mousePos.x - this.bounds.toggle.width / 2, y: mousePos.y - this.bounds.toggle.height / 2},
                title: {x: mousePos.x - this.bounds.title.width / 2, y: mousePos.y - this.bounds.title.height / 2}
            };
            this.lastScale = 1;
            this.lastOpacity = 1;
            requestAnimationFrame(() => this.cursor_render());
        }

        /* (1.1) Cursor Render Init */
        cursor_render() {
            const diff = this.lastMousePos.toggle.x - (mousePos.x - this.bounds.toggle.width / 2);
            const rightSide = mousePos.x >= winsize.width / 2;
            this.DOM.title.style.left = rightSide ? 'auto' : '30px';
            this.DOM.title.style.right = rightSide ? '30px' : 'auto';
            const lerpFactor = {
                toggle: rightSide ? diff < 0 ? 0.15 : 0.1 : diff < 0 ? 0.1 : 0.15,
                title: rightSide ? diff < 0 ? 0.1 : 0.15 : diff < 0 ? 0.15 : 0.1
            };
            this.lastMousePos.toggle.x = MathUtils.lerp(this.lastMousePos.toggle.x, mousePos.x - this.bounds.toggle.width / 2, lerpFactor.toggle);
            this.lastMousePos.toggle.y = MathUtils.lerp(this.lastMousePos.toggle.y, mousePos.y - this.bounds.toggle.height / 2, lerpFactor.toggle);
            this.lastMousePos.title.x = MathUtils.lerp(this.lastMousePos.title.x, mousePos.x - this.bounds.title.width / 2, lerpFactor.title);
            this.lastMousePos.title.y = MathUtils.lerp(this.lastMousePos.title.y, mousePos.y - this.bounds.title.height / 2, lerpFactor.title);
            this.lastScale = MathUtils.lerp(this.lastScale, 1, 0.15);
            this.lastOpacity = MathUtils.lerp(this.lastOpacity, 1, 0.1);
            this.DOM.toggle.style.transform = `translateX(${(this.lastMousePos.toggle.x)}px) translateY(${this.lastMousePos.toggle.y}px) scale(${this.lastScale})`;
            this.DOM.toggle.style.opacity = this.lastOpacity;
            this.DOM.title.style.transform = `translateX(${(this.lastMousePos.title.x)}px) translateY(${this.lastMousePos.title.y}px)`;
            requestAnimationFrame(() => this.cursor_render());
        }

        /* (1.2) Cursor Click Init */
        click() {
            this.lastScale = .5;
            this.lastOpacity = 0;
        }

        /* (1.3) Cursor Toggle Init */
        toggle() {
            const isCircle = this.DOM.toggle.classList.contains('cursor--inner-circle');
            this.DOM.toggle.classList[isCircle ? 'remove' : 'add']('cursor--inner-circle');
            this.DOM.title.style.opacity = isCircle ? 0 : 1;
        }
    }

    /* [3] Price Filter Init */
    {
        $('#price-range-submit').hide();
        $("#min_price,#max_price").on('change', function () {
            $('#price-range-submit').show();
            var min_price_range = parseInt($("#min_price").val());
            var max_price_range = parseInt($("#max_price").val());
            if (min_price_range > max_price_range) {
                $('#max_price').val(min_price_range);
            }
            $("#slider-range").slider({
                values: [min_price_range, max_price_range]
            });
        });
        $("#min_price,#max_price").on("paste keyup", function () {
            $('#price-range-submit').show();
            var min_price_range = parseInt($("#min_price").val());
            var max_price_range = parseInt($("#max_price").val());
            if (min_price_range == max_price_range) {
                max_price_range = min_price_range + 100;
                $("#min_price").val(min_price_range);
                $("#max_price").val(max_price_range);
            }
            $("#slider-range").slider({
                values: [min_price_range, max_price_range]
            });
        });
        $(function () {
            $("#slider-range").slider({
                range: true,
                orientation: "horizontal",
                min: 0,
                max: 10000,
                values: [0, 10000],
                step: 100,

                slide: function (event, ui) {
                    if (ui.values[0] == ui.values[1]) {
                        return false;
                    }

                    $("#min_price").val(ui.values[0]);
                    $("#max_price").val(ui.values[1]);
                }
            });

            $("#min_price").val($("#slider-range").slider("values", 0));
            $("#max_price").val($("#slider-range").slider("values", 1));

        });
        $("#slider-range,#price-range-submit").on('click', function () {
            var min_price = $('#min_price').val();
            var max_price = $('#max_price').val();
            $("#searchResults").text("Here List of products will be shown which are cost between " + min_price + " " + "and" + " " + max_price + ".");
        });
        $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
        let spinner = $(this),
            input = spinner.find('input[type="number"]'),
            btnUp = spinner.find('.quantity-up'),
            btnDown = spinner.find('.quantity-down'),
            min = input.attr('min'),
            max = input.attr('max'),
            newVal,
            oldValue;
        btnUp.on('click', function () {
            oldValue = parseFloat(input.val());
            if (oldValue >= max) {
                newVal = oldValue;
            } else {
                newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
        btnDown.on('click', function () {
            let oldValue = parseFloat(input.val());
            if (oldValue <= min) {
                newVal = oldValue;
            } else {
                newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    }

    /* [4] Images Loaded */
    general.body.imagesLoaded(function () {

        setTimeout(function () {
            /* Preloader Hide*/
            loader.addClass('page-loader-hide');
            /* Animation Element Method Init */
            setPreviewAnimation();
            /* Navigation Items Animation Method Init */
            startAppear();
        },1800);

        /* AOS init */
        AOS.init();

        /* [5] Declaration Of Constants For Main Classes */
        const _NAVIGATION = new NAVIGATION();
        const _FUNC = new FUNC();
        const cursor = new CURSOR(document.querySelector('.cursor'));

        /* Navigation Functions Init */
        /* Menu Toggle Panel And Menu Items Animation Method Init*/
        _NAVIGATION._navigationPanel();
        /* Menu Side Panel Method Init */
        _NAVIGATION._sidebarPanel();


        /* Main Functions Init */
        /* Swiper Coverflow Method Init */
        _FUNC.func_swiperCoverflow();
        /* Swiper Portfolio Method Init */
        _FUNC.func_swiperPortfolio();
        /* Tilt Method Init*/
        _FUNC.func_tilt();
        /* Video Modal Init Method Init */
        _FUNC.func_videoModalInit();
        /* Clients Slider Method Init */
        _FUNC.func_swiperClient();
        /* Accordions Method Init */
        _FUNC.func_accordions();
        /* Team Slider Method Init */
        _FUNC.func_swiperTeam();
        /* Isotope Grid Method Init */
        _FUNC.func_isotopeGridInit();
        /* Swiper Text Method Init */
        _FUNC.func_swiperText();
        /* Ajax For Contact Forms Method Init */
        _FUNC.func_ajaxContactForm();
        /* Accordion Gallery Method Init */
        _FUNC.func_accordionGallery();
        /* Image Modal Method Init */
        _FUNC.func_imageModalInit();
        /* Gallery Method Init */
        _FUNC.func_galleryInit();
        /* Tabs Method Init */
        _FUNC.func_tabs();
        /* Sticky Sidebar Method Init */
        _FUNC.func_stickySidebar();
        /* Background Slider Method Init */
        _FUNC.func_backgroundSlider();
        /* Blog Video Post Method Init */
        _FUNC.func_blogVideoPost();
        /* Counters Method Init */
        _FUNC.func_counters();

        /* Animation */
        /* Parallax Footer Method Init */
        fixedFooter();
    });

});

