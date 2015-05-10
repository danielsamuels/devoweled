from django import template

from ..models import Word

from collections import OrderedDict

register = template.Library()


@register.assignment_tag
def word(length=3, difficulty=5, attempt=1):
    length = int(length)

    letters = Word.objects.filter(
        no_vowels_length=length,
    ).order_by('?')[:1]

    if letters:
        letters = letters[0].no_vowels
    else:
        return {
            'length': length,
            'difficulty': difficulty
        }

    # Get all the words which could match these letters.
    possibilities = Word.objects.filter(
        no_vowels=letters
    ).order_by('full_word_length')

    if possibilities.count() < int(difficulty):
        if attempt > 10:
            length = length - 1
            attempt = 0

        # Redraw a word.
        # print 'Not enough possibilities from {} (there were {} at difficulty {}), redrawing.'.format(
        #     letters,
        #     possibilities.count(),
        #     difficulty,
        # )
        return word(length, difficulty, attempt+1)

    words = {}
    for possibility in possibilities:
        if possibility.full_word_length not in words:
            words[possibility.full_word_length] = []

        words[possibility.full_word_length].append(possibility.full_word)

    words = OrderedDict(sorted(words.items()))

    return {
        'letters': letters,
        'possible': words,
        'length': length,
        'difficulty': difficulty
    }


@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)
