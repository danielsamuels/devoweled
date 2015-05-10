var base_font_size = 192,
    vowels = ['a', 'e', 'i', 'o', 'u'],
    solved = [],
    hint_timer = null,
    answers_visible = false;

function resizeInputText() {
    el = $('#game_input')[0];
    attempts = 0;

    $(el).css({
        fontSize: base_font_size,
        paddingTop: 0
    })

    while (el.scrollWidth > el.clientWidth) {
        size = parseFloat($(el).css('font-size'));
        new_size = size - 1;
        $(el).css({
            fontSize: new_size,
            paddingTop: (base_font_size - new_size) / 2,
        });
        attempts++;
    }
}

function checkWord() {
    input = $('#game_input').val().toLowerCase().trim();

    // Already solved
    if (solved.indexOf(input) !== -1) {
        $('body').addClass('previous');
        return true;
    }

    if (words.indexOf(input) !== -1) {
        // The word was correct!
        $('body').addClass('correct');

        // Add to the solved list.
        solved.push(input);

        // Show the answer on the page.
        $('.answer[data-value=' + input + ']').show();
        $('.answers-' + input.length).show();

        // Update the count.
        len_count = 0;
        for (var i=0; i<solved.length; i++) {
            if (solved[i].length == input.length) {
                len_count++;
            }
        }
        $('.track-' + input.length).html(len_count);

    } else {
        $('body').addClass('incorrect');
    }
}

function provideHint() {
    clearInterval(hint_timer);

    // Look for an unsolved word.
    el = $('.answer').not(':visible')[0]

    if (typeof el === "undefined") {
        $('#hint h1').html('');
        return;
    }

    word = $(el).attr('data-value');

    // Get the number of vowels.
    word_vowels = [];

    for (var i=0; i<vowels.length; i++) {
        count = (word.match(new RegExp(vowels[i], 'g')) || []).length;

        if (count > 0) {
            word_vowels.push(count + 'x ' + vowels[i].toLowerCase());
        }
    }

    $('#hint h1').html("Hint: " + word_vowels.join("&nbsp;&nbsp;"));

    hint_timer = setTimeout(function() {
        $('#hint h1').html('');
    }, 5000);
}

$(function () {
    $('body').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $('body').removeClass('correct incorrect previous');
    });

    $('#game_input').on('keydown', function(e) {
        caret = $(this).caret();

        if (e.which == 13) {  // Enter
            checkWord();
        } else if (e.which == 8) {  // Backspace
            // Get the previous letter.
            letter = $(this).val().substr(caret.start-1, 1)

            if (vowels.indexOf(letter.toLowerCase()) !== -1) {
                // Remove the letter manually.
                before = $(this).val().substr(0, caret.start)
                after = $(this).val().substr(caret.start)

                // Remove the last character.
                new_before = before.substr(0, before.length - 1);
                $(this).val(new_before + after);

                // Put the caret back.
                $(this)[0].setSelectionRange(caret.start-1, caret.start-1);
            } else {
                // Move back to the previous vowel.
                string = $(this).val().substr(0, caret.start);

                for (var i=1; i<=string.length; i++) {
                    letter = string[string.length - i];

                    if (vowels.indexOf(letter.toLowerCase()) !== -1) {
                        // Move the caret to this letter (but don't delete it).
                        $(this)[0].setSelectionRange(string.length - i + 1, string.length - i + 1);

                        break;
                    }
                }
            }
        } else if (
            e.which == 65 ||  // A
            e.which == 69 ||  // E
            e.which == 73 ||  // I
            e.which == 79 ||  // O
            e.which == 85     // U
        ) {
            // Add the letter manually.
            before = $(this).val().substr(0, caret.start)
            after = $(this).val().substr(caret.start)

            $(this).val(before + String.fromCharCode(e.which) + after);

            // Put the caret back.
            $(this)[0].setSelectionRange(caret.start+1, caret.start+1);
        } else if (
            e.which == 37 ||  // Left arrow
            e.which == 39     // Right arrow
        ) {
            return true;
        } else if (e.which == 27) {  // Escape
            $(this).blur();
        } else if (e.which == 82) {  // R
            // Remove all vowels from the string.
            $(this).val($(this).val().replace(/[aeiou]/ig, ''));

            // Move the caret to the start.
            $(this)[0].setSelectionRange(0, 0);
        } else if (e.which == 72) {  // H
            provideHint();
        } else if (e.which == 78) {  // N
            window.location = '/';
        } else if (e.which == 86) {  // V
            if ( ! answers_visible) {
                $('.answer, .answers').show();
                answers_visible = true;
            } else {
                $('.answer, .answers').hide();
                answers_visible = false;

                for (var i=0; i<solved.length; i++) {
                    // Show the answer on the page.
                    $('.answer[data-value=' + solved[i] + ']').show();
                    $('.answers-' + solved[i].length).show();
                }
            }
        } else {
            known = [
                16  // Shift
            ]

            if (known.indexOf(e.which) === -1) {
                console.debug(e.which);
            }
        }

        resizeInputText();
        return false;
    });

    $('header').addClass('seen');
    $('#game_input').focus();

    // Help out the filthy cheaters.
    if (typeof console !== "undefined") {
        console.log("Where's the fun in cheating? You're going figure out the variable name anyway, so I'll save you the time:");
        console.log(words);
    }
});
