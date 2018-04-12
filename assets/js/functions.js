//Enable popovers
$(function () {
    $('[data-toggle="popover"]').popover();
});

//index page
$( document ).ready(function() {
    if ($('#sitepage').val() !== 'index' ) return;
    $('.reviews').slick({
        dots: true,
        nextArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-next slider-arrow-abs slick-arrow"><span class="icon-arrow-right"></span></div>',
        prevArrow: '<div class="slider-arrow slider-arrow-blue slider-arrow-prev slider-arrow-abs slick-arrow"><span class="icon-arrow-left"></span></div>'
    });

    $('.category .show-all').click(function() {
        $(this).closest('.category-parent').addClass('unscrolled');
    });
    $('.category .hide-all').click(function() {
        $(this).closest('.category-parent').removeClass('unscrolled');
    });



    //Typewriter
    var typeWriter = {
        typeWriter: function(element, i, txt, speed) {
            if (i < txt.length) {
                element.classList.add('typewriter-typing');
                element.classList.remove('typewriter-cursor-blink');
                element.innerHTML += txt.charAt(i);
                i++;
                var deltaSpeed = (Math.random() * 2 + 0.2 ) * speed;
                setTimeout(this.typeWriter.bind(this, element, i, txt, speed), deltaSpeed );
            }
            else {
                element.classList.remove('typewriter-typing');
                if(element.dataset.typewriterCursorBlink !== undefined) {
                    element.classList.add('typewriter-cursor-blink');
                }
                element.dispatchEvent(new Event('onTypewriterFinish'));
            }
        },
        typeWriterRemove: function (element, i, speed) {
            if (i > 0) {
                element.classList.add('typewriter-typing');
                element.classList.remove('typewriter-cursor-blink');
                element.innerHTML = element.innerHTML.slice(0, -1);
                i--;
                setTimeout(this.typeWriterRemove.bind(this, element, i, speed), speed );
            }
            else {
                element.classList.remove('typewriter-typing');
                if(element.dataset.typewriterRemoveCursorBlink !== undefined) {
                    element.classList.add('typewriter-cursor-blink');
                }
                element.dispatchEvent(new Event('onTypewriterRemoveFinish'));
            }
        },
        typeWriterConfig: function (element) {
            var text = element.innerHTML;
            var startAfter = element.dataset.typewriterStartAfter ? element.dataset.typewriterStartAfter : null;
            var speed = element.dataset.typewriterSpeed ? element.dataset.typewriterSpeed : 10;
            var delay = element.dataset.typewriterDelay ? element.dataset.typewriterDelay : element.dataset.typewriterDelayStep ? element.dataset.typewriterDelayStep * speed : 0;
            var startTime = element.dataset.typewriterStart ? element.dataset.typewriterStart : 0;
            var write = function(text) {
                element.innerHTML = '';
                setTimeout(function () {
                    typeWriter.typeWriter(element, 0, text, speed);
                }, delay);
            };
            var start = function() {
                element.innerHTML = '';
                setTimeout(function () {
                    if (!startAfter) {
                        write(text);
                    } else {
                        startAfter = startAfter.split(',');
                        var selector = startAfter[0].trim();
                        var eventName = startAfter[1].trim();
                        var element = document.querySelector(selector);
                        element.addEventListener(eventName, write.bind(this, text));
                    }
                }, startTime);
            };
            return {start: start, write: write, element: element};
        },
        typeWriterRemoveConfig: function (element) {
            var startAfter = element.dataset.typewriterRemoveStartAfter ? element.dataset.typewriterRemoveStartAfter : null;
            var speed = element.dataset.typewriterRemoveSpeed ? element.dataset.typewriterRemoveSpeed : 15;
            var delay = element.dataset.typewriterRemoveDelay ? element.dataset.typewriterRemoveDelay : element.dataset.typewriterRemoveDelayStep ? element.dataset.typewriterRemoveDelayStep * speed : 0;
            var startTime = element.dataset.typewriterRemoveStart ? element.dataset.typewriterRemoveStart : 0;
            var write = function() {
                setTimeout(function () {
                    var length = element.innerHTML.length;
                    typeWriter.typeWriterRemove(element, length, speed);
                }, delay);
            };
            var start = function() {
                setTimeout(function () {
                    if (!startAfter) {
                        write();
                    } else {
                        startAfter = startAfter.split(',');
                        var selector = startAfter[0].trim();
                        var eventName = startAfter[1].trim();
                        var element = document.querySelector(selector);
                        element.addEventListener(eventName, write);
                    }
                }, startTime);
            };
            return {start: start, write: write, element: element};
        }
    };

    (function () {
        [].slice.call(document.getElementsByClassName('typewriter-effect')).map(function(element){
            typeWriter.typeWriterConfig(element).start();
        });
        [].slice.call(document.getElementsByClassName('typewriter-remove-effect')).map(function(element){
            typeWriter.typeWriterRemoveConfig(element).start();
        });
    })();

    $('.typewriter-effect[data-typewriter=main-heading]').on('onTypewriterFinish', function(){
        $('.main-info').addClass('fadein-bottom');
        $('.main-button').addClass('fadein-bottom');
    });

});


//FAQ Page
$( document ).ready(function() {
    if ($('#sitepage').val() !== 'faq' ) return;
   $('.faq-container h3').click(function () {
       $(this).closest('.faq-container').toggleClass('unscrolled');
   });
});

//About Page
$( document ).ready(function() {
    if ($('#sitepage').val() !== 'about' ) return;
    $('.certificates').magnificPopup({
       delegate: 'a.certificate',
       type: 'image',
       tLoading: 'Загрузка изображения #%curr%...',
       zoom: {
           enabled: true,
           duration: 300
       },
       gallery: {
           enabled: true,
           navigateByImgClick: true,
           preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
           tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
       }
    });
    $('.licenses').magnificPopup({
        delegate: 'a.license',
        type: 'image',
        tLoading: 'Загрузка изображения #%curr%...',
        zoom: {
            enabled: true,
            duration: 300
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
            tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
        }
    });

});
//Form section
$(document).ready(function () {
    $('input[name="phone"]').inputmask("+7 (799) 999 99 99");

    $('.callbackForm, #callbackForm').submit(function(e) {
        e.preventDefault();
        var nameElement = this.elements.name;
        var phoneElement = this.elements.phone;
        var name = nameElement.value.trim();
        var phone = phoneElement.value.trim();
        var valid = true;
        if (name === '') {
            nameElement.classList.add('no-valid');
            valid = false;
        } else {
            nameElement.classList.remove('no-valid');
        }
        if (phone.indexOf('_') !== -1) {
            phoneElement.classList.add('no-valid');
            valid = false;
        } else {
            phoneElement.classList.remove('no-valid');
        }
        if (!valid) return;

        sendMessage(this, name, phone);

    });

    var sendMessage = function(form, name, phone) {
        var message = '💡Новая заявка от ' + name;
        message += '\n    <i> Телефон: </i> ' + phone;
        message = encodeURIComponent(message);

        $('.ajax-status').html('Отправляем <span class="icon-spinner spin-me" style="display: inline-block;"></span>');

        $(form).attr('disabled', true);
        $(form.elements).attr('disabled', true);

        setTimeout(function() {
            setTimeout(function () {
                $('.form-fade-out').fadeOut(function () {
                    $(form).attr('disabled', false);
                    $(form.elements).attr('disabled', false);
                    $(form.elements).val('');
                    $('.ajax-status').html('Отправить');
                    $('#callbackModal').modal('show');
                    $('.thanks-fade-in').fadeIn(function () {
                        setTimeout(function () {
                            $('#callbackModal').modal('hide');
                            $('.thanks-fade-in').fadeOut(function () {
                                $('.form-fade-out').fadeIn();
                            });
                        }, 3500);
                    })
                });
            }, 300);
            console.log(message);
        }, 3000);
    }
});

