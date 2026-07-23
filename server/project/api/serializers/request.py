# serializers.py

from rest_framework import serializers


class TripPlannerSerializer(serializers.Serializer):

    current_location = serializers.CharField()
    country = serializers.CharField()

    pickup_locations = serializers.ListField()

    dropoff_locations = serializers.ListField()

    current_cycle_used = serializers.FloatField()