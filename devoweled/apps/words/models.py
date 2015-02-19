from django.db import models


class Word(models.Model):

    full_word = models.CharField(
        max_length=100,
    )

    full_word_length = models.PositiveIntegerField(

    )

    no_vowels = models.CharField(
        max_length=100,
    )

    no_vowels_length = models.PositiveIntegerField(

    )

    def __unicode__(self):
        return self.full_word

    class Meta:
        ordering = ('full_word',)
