from django.contrib import admin
from .models import Trip

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "destination", "user", "start_date", "end_date")
    list_filter = ("destination",)
    search_fields = ("title", "destination")
