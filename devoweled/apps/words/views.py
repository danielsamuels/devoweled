from django.core.urlresolvers import reverse
from django.views.generic import RedirectView, TemplateView

from .templatetags.words_tags import word


class LetterPickView(RedirectView):
    permanent = False

    def get_redirect_url(self):
        return reverse('words:game', kwargs={
            'letters': word()['letters']
        })


class GameView(TemplateView):
    template_name = 'game.html'

    def get_context_data(self, **kwargs):
        context = super(GameView, self).get_context_data(**kwargs)
        context['word'] = word(letters=self.kwargs.get('letters'))
        return context
