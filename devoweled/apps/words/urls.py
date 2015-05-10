from django.conf.urls import patterns, url

import views

urlpatterns = patterns(
    "",

    url(r'^$', views.LetterPickView.as_view(), name='pick'),
    url(r'^(?P<letters>\w+)/$', views.GameView.as_view(), name='game'),
)
