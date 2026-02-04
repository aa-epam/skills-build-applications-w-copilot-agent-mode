from django.contrib import admin
from .models import User, Team, Activity, Workout, LeaderboardEntry

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name')
    search_fields = ('username', 'email')

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)
    filter_horizontal = ('members',)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'duration', 'calories_burned', 'date', 'team')
    list_filter = ('activity_type', 'date')
    search_fields = ('user__username',)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'difficulty')
    search_fields = ('name', 'difficulty')
    filter_horizontal = ('suggested_for',)

@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('user', 'team', 'score', 'last_updated')
    list_filter = ('team',)
    search_fields = ('user__username',)
