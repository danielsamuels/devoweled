from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Load a word list into the database."

    def handle(self, *args, **options):
        print args, options
