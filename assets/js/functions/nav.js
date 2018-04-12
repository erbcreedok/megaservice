$(document).ready(function() {

var nav = $('nav');
var subheader = $('.subheader');
var searchbar = subheader.find('.search-bar');
var nameinput = searchbar.find('input[name=name]');
var navbarCheck = function() {
    nav.toggleClass('navbar-filled', window.scrollY > 0);
};

navbarCheck();

$(document).scroll(function() {
    navbarCheck();
});

$('.navbar .main-nav li a').on('click', function(e) {
    setTimeout(function() {
        $("#mainNavbar").collapse('hide');
    }, 300);
});

console.log(subheader);
console.log(searchbar);

subheader.find('.open-search').click(function () {
    searchbar.addClass('is-searching');
});

searchbar.find('span.icon-search').click(function () {
    if (searchbar.hasClass('is-typing')) return;
    searchbar.removeClass('is-searching');
});

nameinput.on('change, keyup', function() {
    var isEmpty = $(this).val().trim() === '';
    console.log(isEmpty);
    searchbar.toggleClass('is-typed', !isEmpty);
    console.log(searchbar);
    var button = searchbar.find('button.btn-search');
    if (isEmpty) {
        button.attr('type','button');
    } else {
        button.attr('type','submit');
    }
});


});