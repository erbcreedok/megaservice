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

