from rest_framework import serializers

class TripResponseSerializer(
    serializers.Serializer
):

    # distance = serializers.FloatField()

    # duration = serializers.FloatField()

    # fuel_stops = serializers.IntegerField()

    # rest_stops = serializers.IntegerField()

    # daily_logs = serializers.ListField()

    # timeline = serializers.ListField()

    # compliance = serializers.DictField()

    route = serializers.DictField()

    fuel = serializers.DictField()

    hos = serializers.DictField()

    timeline = serializers.DictField()

    logs = serializers.DictField()