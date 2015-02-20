var initial_height = 112;

function checkWordHeight() {
    while ($('.word').height() > initial_height) {
        letter_font_size = parseInt($('.letter').css('font-size'));
        $('.letter').css('font-size', (letter_font_size-1) + 'px');

        if (letter_font_size > 100) {
            $('.add').css('font-size', (letter_font_size-84) + 'px');
        }
    }
}


$(function () {
    $(document).on('click', function (e) {
        if (e.target.className === "add active") {
            return true;
        }

        if ($('.options.active')) {
            $('.options').removeClass('active');
        }

        return true;
    })

    $('.word').on('click', '.add', function (e) {
        $('.add').removeClass('active');
        $(this).addClass('active');

        $('.options').css({
            position: 'absolute',
            left: e.originalEvent.x,
            top: e.originalEvent.y
        }).addClass('active');
    });

    $('.word').on('click', '.vowel', function () {
        $(this).next().remove();
        $(this).remove();
    });

    $('.options li').on('click', function () {
        $el = $('<li/>', {
            'class': 'letter vowel'
        }).html($(this).html());

        $('.add.active').after($el)
        $el.after($('<li/>', {
            'class': 'add'
        }).html('+'));

        checkWordHeight();
    });

    $('.reset').on('click', function () {
        $('.vowel, .vowel + .add').remove();
        $('.word').removeClass('win lose');

        $('.letter').each(function () {
            if ($(this).next().hasClass('add')) {
                return true;
            }

            $(this).after($('<li/>', {
                'class': 'add'
            }).html('+'));
        });

        return false;
    });

    $('.solve').on('click', function () {
        $('.answers').toggle();
    });

    $('.check').on('click', function () {
        $('.word').removeClass('win lose');

        str = '';
        $('.letter').each(function () {
            str = str + $(this).html();
        });

        str = str.trim();

        if (words.indexOf(str) !== -1) {
            $('.add').remove();
            $('.word').addClass('win');

            $('.letter').css('font-size', '');
            checkWordHeight();
        } else {
            $('.word').addClass('lose');

            setTimeout(function () {
                $('.word').removeClass('lose');
            }, 2500);
        };

        return false;
    });

    checkWordHeight();
});
