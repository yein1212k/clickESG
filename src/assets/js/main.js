function mainVisual() {
    var slideData = [
        { name: 'ClickESG Service' },
        { name: 'ClickESG Solutions' },
        { name: 'About ClickESG' }
    ];



    var count = 0;
    var countId = '';
    var isCounterOn = status;


    function loading_bar(){
      $('.count_txt').text(count);
      var loading_val = (100 * count )/ 50
      $('.swiper-pagination-bullet .timer-percent').css({'width':0+'%'});
      $('.swiper-pagination-bullet-active .timer-percent').css({'width':loading_val+'%'});
      var activeBulletTitleW = $('.swiper-pagination-bullet-active .timer-title').outerWidth();
                $('.swiper-pagination-bullet').css({'width':'18px'});
                $('.swiper-pagination-bullet-active').css({'width':activeBulletTitleW+'px'});
    }

    function startCounter() {

        var activeBulletTitleW = $('.swiper-pagination-bullet-active .timer-title').outerWidth();
        $('.swiper-pagination-bullet-active').css({'width':activeBulletTitleW+'px'});

        clearTimeout(countId);
        countId = setInterval(function() {
            count += 1;
            if(count === 50){
                slider.slideNext();
                count = 0;
            }
            loading_bar();
        }, 100);
        isCounterOn = true;
      }

      function stopCounter() {
        clearTimeout(countId);
        isCounterOn = false;
      }
      console.log(document.querySelector('.swiper-container'));
    var sliderBg = new Swiper(".swiper-list.bg", {
        slidesPerView: 1,
        loop: true,
        // autoplay: {
        //     delay: 5000,
        // },
        speed: 1200,
        pagination: {
            el: ".swiper-controls .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + '"><span class="timer-title">'+ 0 + (index + 1) + ' ' + slideData[index].name +'</span>'+ '<span class="timer-bar"><span class="timer-percent"></span></span></div>';
            },
        },
        thumbs: {
            swiper: sliderLink
        },
        on: {
            init: function () {
                $('.swiper-pagination-bullet').css({'width':'18px'});
                setTimeout(function() {
                    startCounter();
                }, 100);

            },
            slideChangeTransitionStart: function () {
                count = 0;
                loading_bar();


            }
        }
    });

    var sliderLink = new Swiper(".link", {
        loop: true,
        allowTouchMove: false,
        // autoplay: {
        //     delay: 5000,
        // },
        effect: 'fade',
    });

    var sliderTitle = new Swiper(".title", {
        loop: true,
        speed: 1200,
    });

    sliderBg.controller.control = sliderTitle;
    sliderTitle.controller.control = sliderBg;

    var toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function() {
        if (isCounterOn === true) {
            stopCounter();
            toggleButton.textContent = 'Play';
        } else {
            startCounter();
            toggleButton.textContent = 'Stop';
        }
    });

    $('.swiper-pagination-bullet').on('click', function() {
        count = 0;
        if (isCounterOn === true) {
            startCounter();
        } else {
            loading_bar();
        }

      });

      window.addEventListener('resize', function () {
        sliderBg.update();
    sliderTitle.update();
    });
}

