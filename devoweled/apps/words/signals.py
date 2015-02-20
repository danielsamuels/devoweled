import re


def handle_word_pre_save(**kwargs):
    # print u"Processing {}".format(kwargs['instance'].full_word)

    kwargs['instance'].full_word = kwargs['instance'].full_word.lower()
    kwargs['instance'].full_word_length = len(kwargs['instance'].full_word)
    kwargs['instance'].no_vowels = re.sub(r'[aeiou]', '', kwargs['instance'].full_word)
    kwargs['instance'].no_vowels_length = len(kwargs['instance'].no_vowels)
