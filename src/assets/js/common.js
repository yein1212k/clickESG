var frontCommon = frontCommon || {};
frontCommon.Html = (function () {
  var instance = null;
  function init() {
    instance = {
        reset: function () {
            frontCommonResize();
            //frontCommonScroll();
            //header();
            //footer();
            //localAnimations();
            lenis();
            //business_Interaction();
            //scrollTopBtn();
        },
    };
    return instance;
  }
  if (instance) {
    return instance;
  } else {
    return init();
  }
})();

function frontCommonResize() {
  window.addEventListener("resize", () => {
    const _header = document.getElementById("header")
    const modalShow = document.querySelector(".modal.show");
    if(modalShow) {
        _header.classList.add("regular")
    }
  });
}

function frontCommonScroll() {
  window.addEventListener("scroll", () => {

  });
}
function lenis() {
    let lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    const _header = document.getElementById("header")
    const siteNavi = _header.querySelector(".site-navi")
    const menuHeader = _header.querySelector(".btn.menu-header")
    const modalData = document.querySelectorAll('[data-bs-toggle="modal"]')
    const modal = document.querySelectorAll(".modal");


    window.addEventListener("scroll", () => {
        if(lenis.direction == -1) {
            _header.classList.add("up-color")
            _header.classList.remove("regular")
            _header.classList.remove("regular-focus")
            siteNavi.classList.remove("close")
            if(lenis.animatedScroll < 5) {
                _header.classList.remove("up-color")
            }
        } else {
            siteNavi.classList.add("close")
            const focusedElement = document.activeElement
            if(focusedElement.closest(".depth1-item") || _header.classList.contains("hover")) {
                _header.classList.add("regular-focus")
                _header.classList.remove("regular")
                if(lenis.animatedScroll < 5) {
                    _header.classList.remove("regular-focus")
                }
            } else {
                if(!_header.classList.contains("open")) {
                    _header.classList.add("regular")
                    _header.classList.remove("regular-focus")
                    if(lenis.animatedScroll < 5) {
                        _header.classList.remove("up-color")
                        _header.classList.remove("regular")
                    }
                }
            }
        }
    })

    if(lenis.animatedScroll < window.innerHeight) {
        _header.classList.remove("regular")
        _header.classList.remove("regular-focus")
    } else {
        _header.classList.add("regular")
    }

    // Mo 헤더 메뉴 클릭시 lenis stop
    menuHeader.addEventListener("click", function() {
        const wrap = document.getElementById("wrap")
        if(_header.classList.contains("open")) {
            lenis = new Lenis()
        } else {
            wrap.removeAttribute("style")
            lenis.destroy();
        }
    })
    window.addEventListener("resize", () => {
        const _width = window.innerWidth
        if(_width >= 1024) {
            if(modal) {
                modal.forEach(modal => {
                    if(modal.classList.contains("show")) {
                        return;
                    } else {
                        lenis = new Lenis()
                    }
                });
            }
        } else {
            // lenis.destroy();
        }
    })


    // 팝업창 lenis 스크롤 destroy
    if(modalData) {
        modalData.forEach(modalData => {
            modalData.addEventListener("click", function() {
                _header.style.top = "-7.2rem"
                modal.forEach(modal => {
                    if(modal.classList.contains("show")) {
                        lenis.destroy();
                    }
                });
            });
        });
    }

    modal.forEach(modal => {
        if(modal) {
            const close = modal.querySelector(".modal-close")
            close.addEventListener("click", function() {
                lenis = new Lenis()
                _header.removeAttribute("style")
            })
        }
    });

    const main = document.getElementById("main")
    if(main.classList.contains("sk-main")) {
        const media = document.querySelector(".section.media")
        let press = media.querySelector(".press-media")
        const sns = media.querySelector(".sns-media")
        if(media && sns) {
            gsap.to(press, {
                scrollTrigger: {
                    trigger: sns,
                    start: "top bottom",
                    end: "top bottom",

                    onEnter: function() {
                        const _width = window.innerWidth
                        if(_width >= 1024) {
                            press.style.top = window.innerHeight - press.offsetHeight + "px"
                        }
                    },

                    onLeave: function() {
                        const _width = window.innerWidth
                        if(_width >= 1024) {
                            lenis.stop();
                            media.classList.add("active2")
                            press = media.querySelector(".press-media")

                            sns.style.marginTop = -press.offsetHeight + "px"

                            setTimeout(() => {
                                lenis.start();
                            }, 1000);
                        }
                    },
                    onEnterBack: function() {
                        const _width = window.innerWidth
                        if(_width >= 1024) {
                            lenis.stop();
                            media.classList.remove("active2")
                            sns.style.marginTop = "0"
                            press.style.top = window.innerHeight - press.offsetHeight + "px"
                            setTimeout(() => {
                                lenis.start();
                            }, 1000);
                        }
                    }

                }
            })
        }
    }

    document.addEventListener("keydown", (e) => {
        if(e.key === 'Tab') {
            setTimeout(() => {
                const media = document.querySelector(".sk-main .section.media")
                const focusedElement = document.activeElement
                if(media) {
                    let press = media.querySelector(".press-media")
                    if(focusedElement.closest(".press-media")) {
                        window.scrollTo(0, media.offsetTop + press.style.getPropertyValue(top))
                    }
                    if(focusedElement.classList.contains("newest-link") && !e.shiftKey) {
                        window.scrollTo(0, press.offsetTop - press.offsetHeight + 300)
                    }
                }
            }, 0);
        }
    })
}
function localAnimations() {
    $header = $('header');
    $breadcrumb = $('.data-list.breadcrumb');

    $('[data-local-animation="case-1"]').each(function(){
        $this = $(this);
        $this.addClass('active');

        // $header.removeClass('light').addClass('transparent');
        $breadcrumb.removeClass('case1').addClass('case2');
    });
}

function header() {
    const body = document.querySelector("body")
  const _header = document.getElementById("header")
  const depth1Item = _header.querySelectorAll(".depth1-item")
  const depth1All = document.querySelectorAll('.depth1')
  const depth2WrapAll = document.querySelectorAll(".depth2-wrap")
  const siteNavi = _header.querySelector(".site-navi")
  const _width = window.innerWidth

  if (_header) {
    window.addEventListener("resize", () => {
        const _width = window.innerWidth
        if(_width >= 1200) {
            _header.classList.remove("open")
            _header.removeAttribute("style")

            for (const item of depth1All) {
                item.classList.remove("active")
            }
            for (const item of depth2WrapAll) {
                item.removeAttribute("style")
            }

            body.style.overflow = "auto";
        }
        stickOutDepth();
    })

    // depth2가 8개 이상일 때 고유 스타일 추가
    function stickOutDepth() {
        const body = document.querySelector('body')
        const _width = window.innerWidth
        if(_width >= 1200) {
            depth1Item.forEach(depth1Item => {
            const depth2List = depth1Item.querySelector(".depth2-list")
            const depth2Length = depth2List.querySelectorAll(".depth2-item").length
            if (depth2Length > 7) {
                depth2List.style.flexWrap = "wrap"
                body.classList.contains("en") ? depth2List.style.maxWidth = "85.6rem" : depth2List.style.maxWidth = "74rem"
            }
            });
        } else {
            depth1Item.forEach(depth1Item => {
                const depth2List = depth1Item.querySelector(".depth2-list")
                const depth2Length = depth2List.querySelectorAll(".depth2-item").length
                if (depth2Length > 7) {
                    depth2List.removeAttribute("style")
                }
            });
        }
    }
    stickOutDepth();

    // hover, focus 클래스 추가 이벤트
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            setTimeout(() => {
                const focusedElement = document.activeElement
                depth1Item.forEach(depth1Item => {
                    depth1Item.classList.remove("active");
                })
                let focusdepth1 = focusedElement.closest(".depth1-item")
                if(focusdepth1) {
                    siteNavi.classList.remove("close")
                    focusdepth1.classList.add("active")
                }
                if(!focusedElement.closest(".site-navi")) {
                    siteNavi.classList.add("close")
                }
            }, 0);
        }
    });
    _header.querySelectorAll("*").forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            depth1Item.forEach(depth1Item => {
                depth1Item.classList.remove("active");
            })
            let hoverdepth1 = e.target.closest(".depth1-item")
            if(hoverdepth1) {
                siteNavi.classList.remove("close")
                hoverdepth1.classList.add("active")
            }
            if(!e.target.closest(".site-navi")) {
                siteNavi.classList.add("close")
            }
        });
    })

    // 언어 셀렉트버튼 기능
    const lang = document.getElementById("gnb_lang")
    const selected = lang.querySelector(".selected")
    const optionArea = lang.querySelector(".option-area")

    selected.addEventListener("click", function () {
      optionArea.classList.contains("active") ? optionArea.classList.remove("active") : optionArea.classList.add("active")
    })

    //

    _header.addEventListener("mouseenter", () => {
        _header.classList.add("hover")
    })
    _header.addEventListener("mouseleave", () => {
        _header.classList.remove("hover")
    })

    document.addEventListener("focusin", function(e) {
        const _target = e.target
        if(_target.closest(".dark") || _target.closest(".transparent")) {
            _header.classList.add("hover")
        } else {
            _header.classList.remove("hover")
        }
    })

    // MO > 메뉴 열기/닫기
    const navi = _header.querySelector(".site-navi")
    const util = _header.querySelector(".site-util")
    const menuHeader = _header.querySelector(".btn.menu-header")
    const menuHeadertxt = menuHeader.querySelector(".btn-text")

    let i = 1;
    for (const item of depth1Item) {
        item.style.animationDelay = (0.15 * i) + "s";
        i++;
    }

    menuHeader.addEventListener("click", function() {
        if(_header.classList.contains("open")) {
            body.style.overflow = "auto";
            menuHeadertxt.innerHTML = "메뉴 열기"
            _header.style.height = "5.8rem"
            setTimeout(() => {
                _header.classList.remove("open")
                for (const item of depth1All) {
                    item.classList.remove("active")
                }
                for (const item of depth2WrapAll) {
                    item.classList.remove("active")
                    $(".depth2-wrap").slideUp(300);
                }
            }, 300);
        } else {
            body.style.overflow = "hidden";
            menuHeadertxt.innerHTML = "메뉴 닫기"
            navi.style.display = "block"
            util.style.display = "flex"
            _header.style.height = "100%"
            setTimeout(() => {
                _header.classList.add("open")
            }, 300);
        }
    })

    // MO > depth1 드롭다운 열림/닫힘 기능
    document.addEventListener("click", function (e) {
      const depth1 = e.target
      if (depth1.classList.contains("depth1")) {
        const _width = window.innerWidth
        if (_width < 1200) {
            e.preventDefault();
          if (depth1.classList.contains("active")) {
            depth1.classList.remove("active")
            $(".depth2-wrap").slideUp(300);
          } else {
            $(".depth2-wrap").slideUp(300);
            depth1All.forEach(all => {
              all.classList.remove("active")
            });
            depth1.classList.add("active")
            $(".depth1.active ~.depth2-wrap").slideDown(300);
          }
        }
      }
    })
  }
}

function Tab() {

    const tabDisplay = document.querySelectorAll(".tab-display")
    tabDisplay.forEach(tab => {
        const firstTab = tab.querySelector(".tab-item:first-child")
        firstTab.classList.add("active")
        firstTab.querySelector(".tab-text").setAttribute("aria-selected", "true")

        const tabList = tab.querySelector(".tab-list")
        tabList.addEventListener("keydown", function(e) {
            e = event || window.event;
            let keycode = e.keyCode || e.which;

            if(!e.shiftKey && keycode === 9) {
                let tabItem = this.querySelectorAll(".tab-item");
                tabItem.forEach(item => {
                    if(item.classList.contains("active")) {
                        const button = item.querySelector(".tab-text");
                        button.setAttribute("tabindex", "0");
                        button.setAttribute("aria-selected", "true")
                    } else {
                        const button = item.querySelector(".tab-text");
                        button.setAttribute("tabindex", "-1");
                        button.setAttribute("aria-selected", "false");
                    }
                });

                let siblingTabPanels = document.querySelectorAll(".panel-item.hidden");
                siblingTabPanels.forEach(panel => {
                    // panel.tabIndex = "-1";
                });
            }
        })
        const tabButton = tab.querySelectorAll(".tab-text")
        tabButton.forEach(button => {
            button.addEventListener("keydown", function(e) {
                e = event || window.event;
                let keycode = e.keyCode || e.which;

                switch(keycode) {
                    case 37:
                        if(this.closest('.tab-item').previousElementSibling) {
                            this.setAttribute("tabindex", "-1")
                            this.closest('.tab-item').previousElementSibling.querySelector('.tab-text').setAttribute("tabindex", "0")
                            this.closest('.tab-item').previousElementSibling.querySelector('.tab-text').focus();
                        }
                        break;
                    case 39:
                        if(this.closest('.tab-item').nextElementSibling) {
                            this.setAttribute("tabindex", "-1")
                            this.closest('.tab-item').nextElementSibling.querySelector('.tab-text').setAttribute("tabindex", "0")
                            this.closest('.tab-item').nextElementSibling.querySelector('.tab-text').focus();
                        }
                        break;
                    case 32:
                    case 13:
                        if(this) {
                            tabButton.forEach(button => {
                                button.setAttribute("aria-selected", "false");
                            });
                            this.setAttribute("aria-selected", "true");
                        }
                        break;
                }
            })
        });
    });

    const panelDisplay = document.querySelectorAll(".panel-display")
    panelDisplay.forEach(panel => {
        const panelItems = panel.querySelectorAll(".panel-item")
        panelItems.forEach((item, i) => {
            i != 0 ? item.classList.add("hidden") : ""
        });
    });
    tabDisplay.forEach((tab, tabDisplayIndex) => {
        const tabItems = tab.querySelectorAll(".tab-item")
        tabItems.forEach((item, tabIndex) => {
            const button = item.querySelector(".tab-text")
            button.addEventListener("click", () => {
                const curTab = button.closest(".tab-item")
                tabItems.forEach(item => {
                    item.classList.remove("active")
                    item.querySelector('.tab-text').setAttribute("tabindex", "-1")
                    item.querySelector('.tab-text').setAttribute("aria-selected", "false")
                });
                curTab.classList.add("active")
                button.setAttribute("tabindex", "0")
                button.setAttribute("aria-selected", "true")

                panelDisplay.forEach((panelDisplay, panelDisplayIndex) => {
                    if(tabDisplayIndex == panelDisplayIndex) {
                        const panelItems = panelDisplay.querySelectorAll(".panel-item")
                        panelItems.forEach((item, panelIndex) => {
                            item.classList.add("hidden")
                            tabIndex == panelIndex ? item.classList.remove("hidden") : ""
                        });
                    }
                });
            })
        });
    });

    new Swiper(".tab-wrap", {
        slidesPerView: "auto",
        freeMode: true,
    });
}

function input() {
    const form = document.querySelectorAll(".form")

    form.forEach(input => {
        if(input.classList.contains("input") || input.classList.contains("search")) {
            const inputRemove = input.querySelector(".remove")
            if(inputRemove) {
                input.addEventListener("keyup", () => {
                    const inputValue = input.querySelector(".input-elem").value;
                    inputValue ? inputRemove.style.display = "block" : inputRemove.style.display = "none";
                })
                inputRemove.addEventListener("click", () => {
                    let inputElem = input.querySelector(".input-elem");
                    inputElem.value = null;
                    inputRemove.style.display = "none";
                })
            }
            input.classList.contains("disabled") ? input.querySelector(".input-elem").setAttribute("disabled", "") : ""
        }
    });
}

/* 아코디언 */
function Accordion() {
    const accordionDisplays = document.querySelectorAll(".accordion-display");

    accordionDisplays.forEach(function(accordionDisplay) {
        const accordionItems = accordionDisplay.querySelectorAll(".accordion-item");

        accordionItems.forEach(function(accordionItem) {
            const button = accordionItem.querySelector(".btn");

            // title 토글 함수
            function toggleAccordion() {
                // this에 title 속성이 있는지 확인
                let currentLabel = this.getAttribute("title");

                if (currentLabel) {
                    // "열기" 또는 "닫기"라는 텍스트가 포함된 경우 조건에 따라 title 값을 변경
                    if (currentLabel.includes("열기")) {
                        this.setAttribute("title", currentLabel.replace("열기", "닫기"));
                    } else if (currentLabel.includes("닫기")) {
                        this.setAttribute("title", currentLabel.replace("닫기", "열기"));
                    }
                }
            }

            button.addEventListener("click", toggleAccordion.bind(button));

            const accordionHeads = accordionItem.querySelectorAll(".accordion-head");
            accordionHeads.forEach(accordionHead => {
                accordionHead.addEventListener("click", function() {
                    // accordion-item에 active 클래스를 토글
                    accordionItem.classList.toggle("active");

                    // active 상태에 따라 panel 높이 업데이트
                    updatePanelHeight();
                });
            });

            // active 클래스 변화 감지 및 panel 높이 업데이트
            const observer = new MutationObserver(updatePanelHeight);
            observer.observe(accordionItem, { attributes: true, attributeFilter: ['class'] });

            // panel 높이 업데이트 함수
            function updatePanelHeight() {
                const panel = accordionItem.querySelector(".accordion-head + *"); //accordion-body
                panel.style.height = accordionItem.classList.contains("active") ? panel.scrollHeight + "px" : null;
            }
        });
    });
}


/* Interaction */
function localAnimations_Case01() {
    $('[data-local-animation="case-1"]').each(function(){
        $this = $(this);
        $breadcrumb = $this.prev('.local-info').find('.data-list.breadcrumb');

        setTimeout(function() {
            $breadcrumb.addClass('active1');
            $this.addClass('active1');
        }, 500);
    });

    gsap.utils.toArray('[data-local-animation="case-1"]').forEach((localInfo, index) => {
        var header = $(localInfo).closest('.main').prev('header');
        var breadcrumb = $(localInfo).closest('.main').find('.local-info .data-list.breadcrumb');

        gsap.to(localInfo, {
            scrollTrigger: {
                //markers: true,
                trigger: localInfo,
                start: '101% bottom',
                end: 'top bottom',
                scrub: 0.001,
                onEnter: function(self) {
                    //console.log('들어왔다')
                    header.removeClass('light').addClass('transparent');
                    breadcrumb.removeClass('dark').addClass('light');
                    localInfo.classList.add('active2');
                    gsap.to('.local-util', {opacity: 0, duration: 0.2,});
                },
                onEnterBack: function(self) {
                    //console.log('돌아왔다')
                    gsap.to('.local-util', {opacity: 1, duration: 0.2,});
                },
            },
        })
    });

    function updatePosition() {
        var scrollY = window.scrollY;
        if(scrollY > 0 && scrollY < 200) {
            gsap.to('.local-util', { y: scrollY, duration: 0,});
        }
    }

    updatePosition();

    document.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
}

function localAnimations_Case02() {

    let $breadcrumb = $('.data-list.breadcrumb');
    let $Figure = $('.local-figure');
    let $Subject =  $('.local-subject');
    let $SubjectName =  $('.local-subject .local-name');
    let $Aside = $('.local-aside');
    let $Util =  $('.local-util');

    gsap.to($SubjectName, {duration: 1, opacity: 1, y: '0%'});
    gsap.to($Figure, {duration: 1, delay:0.5, opacity: 1, y: '0%'});

    gsap.utils.toArray('[data-local-animation="case-2"]').forEach((section, index) => {
        gsap.timeline({
            scrollTrigger: {
                //markers: true,
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.001,
            }
        })
        .fromTo($breadcrumb , {y:'0vh'}, {y:'40vh', opacity:0,}, 0)
        .fromTo($Subject , {y:'0vh'}, {y:'40vh', opacity:0,}, 0)
        .fromTo($Figure, {width: () => '90vw', x:'-50%'}, {width: () => '100vw', x:'-50%'}, 0)
        .to($Figure, { 'background-color': 'rgba(0, 0, 0, 0.5)'}, 0)
        .fromTo($Aside, {y: '-30vh'}, {y: '0%',}, 0)
        .fromTo($Aside, {opacity: 0,}, {opacity: 1, delay:0.5}, 0)
        .fromTo($Util, {opacity: 1, y: '0'}, {opacity: 0, y: '0%',}, 0)
    });

}

function footer() {
    const familySite = document.querySelector(".family-site");
    const btnFamily = familySite.querySelector(".btn-family");
    const siteArea = familySite.querySelector(".site-area");

    btnFamily.addEventListener("click", function() {
        familySite.classList.contains("active") ? familySite.classList.remove("active") : familySite.classList.add("active");
    })
}

function business_Interaction() {
    if(document.querySelector(".main").classList.contains("business")) {
        const intro = document.querySelector(".article.intro")
        const major = document.querySelector(".article.major")
        const hico = document.querySelector(".article.hico")
        const history = document.querySelector(".article.history")
        const portfolio = document.querySelector(".section.portfolio")
        if(intro) {
            const io = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0.1) {
                        intro.classList.add("active")
                    }
                })
            }, {
                threshold: [0.1]
            })
            io.observe(intro.querySelector(".article-body"))
        }
        if(major) {
            const io2 = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0.1) {
                        major.classList.add("active")
                    }
                });
            }, {
                threshold: [0.1]
            })

            io2.observe(major)
        }
        if(hico) {
            const io3 = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0.4) {
                        hico.classList.add("active1")
                    }
                })
            }, {
                threshold: [0.4]
            })
            io3.observe(hico.querySelector(".article-head"))

            const io4 = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0.6) {
                        hico.classList.add("active2")
                    }
                })
            }, {
                threshold: [0.6]
            })
            io4.observe(hico.querySelector(".article-body"))
        }
        if(history) {
            const io5 = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0.2) {
                        history.classList.add("active")
                    }
                })
            }, {
                threshold: [0.2]
            })
            io5.observe(history)
        }
        if(portfolio) {
            const io6 = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.intersectionRatio > 0.2) {
                        portfolio.classList.add("active1")
                    }
                })
            }, {
                threshold: [0.2]
            })
            io6.observe(portfolio.querySelector(".investment"))

            const io7 = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        portfolio.classList.add("active2")
                    }
                })
            }, {
                threshold: [0.01]
            })
            io7.observe(portfolio.querySelector(".article-body"))
        }
    }
}

// top scroll button
function scrollTopBtn() {
    const quickScrollBtnToTop = document.querySelector('.btn-to-top .top-btn');
    const topButton = document.querySelector('.btn-to-top');

    quickScrollBtnToTop.addEventListener('click', function(){
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    })

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const pageBodyHeight = parseInt(document.querySelector('#wrap').clientHeight);
        const showLine = pageBodyHeight * 0.05;
        const contentHeight = document.querySelector('#main').clientHeight;
        const hotLine = contentHeight - window.innerHeight;

        if (scrollTop >= showLine) {
            topButton.classList.add('active');
        } else {
            topButton.classList.remove('active');
        }
        if (scrollTop >= hotLine) {
            topButton.classList.add('fixed');
        } else {
            topButton.classList.remove('fixed');
        }
    });
}