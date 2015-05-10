from .base import *

DEBUG = False
TEMPLATE_DEBUG = DEBUG

INSTALLED_APPS += (
    'raven.contrib.django.raven_compat',
)

# Sentry config.
RAVEN_CONFIG = {
    'dsn': 'https://bbe540f965174d2da70ffacd097c59db:6345ee5cc988477489f817f54eed054e@app.getsentry.com/32482',
}
