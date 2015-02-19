from django.apps import AppConfig
from django.db.models.signals import pre_save

import models
import signals


class WordsConfig(AppConfig):
    name = 'devoweled.apps.words'

    def ready(self):
        # Register the signals we need.
        pre_save.connect(signals.handle_word_pre_save, sender=models.Word)
