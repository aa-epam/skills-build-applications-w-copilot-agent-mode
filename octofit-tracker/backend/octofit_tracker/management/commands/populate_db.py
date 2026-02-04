from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

# Sample data for users, teams, activities, leaderboard, and workouts
USERS = [
    {"email": "ironman@marvel.com", "name": "Iron Man", "team": "Marvel"},
    {"email": "captainamerica@marvel.com", "name": "Captain America", "team": "Marvel"},
    {"email": "batman@dc.com", "name": "Batman", "team": "DC"},
    {"email": "superman@dc.com", "name": "Superman", "team": "DC"},
]

TEAMS = [
    {"name": "Marvel", "members": ["ironman@marvel.com", "captainamerica@marvel.com"]},
    {"name": "DC", "members": ["batman@dc.com", "superman@dc.com"]},
]

ACTIVITIES = [
    {"user_email": "ironman@marvel.com", "activity": "Running", "duration": 30},
    {"user_email": "batman@dc.com", "activity": "Cycling", "duration": 45},
]

LEADERBOARD = [
    {"team": "Marvel", "points": 100},
    {"team": "DC", "points": 90},
]

WORKOUTS = [
    {"name": "Pushups", "difficulty": "Easy"},
    {"name": "Squats", "difficulty": "Medium"},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        from django.db import connection
        db = connection.cursor().db_conn.client[connection.settings_dict['NAME']]

        # Clear collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Insert test data
        db.users.insert_many(USERS)
        db.teams.insert_many(TEAMS)
        db.activities.insert_many(ACTIVITIES)
        db.leaderboard.insert_many(LEADERBOARD)
        db.workouts.insert_many(WORKOUTS)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
