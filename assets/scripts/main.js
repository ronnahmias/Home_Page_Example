jQuery(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > ($('header').height() * 1.2)) {
            $('nav.navbar').addClass('sticky');
        } else {
            $('nav.navbar').removeClass('sticky');
        }

        if ($(this).scrollTop() > ($('header').height()) * 2) {
            $('nav.navbar').addClass('stickyin');
        } else {
            $('nav.navbar').removeClass('stickyin');
        }
    });
});