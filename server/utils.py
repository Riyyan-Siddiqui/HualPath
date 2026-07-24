from math import radians, sin, cos, sqrt, atan2
from datetime import (
    datetime,
    timedelta
)


def calculate_distance(point1, point2):

    # GraphHopper returns:
    # [longitude, latitude]

    longitude1 = point1[0]
    latitude1 = point1[1]

    longitude2 = point2[0]
    latitude2 = point2[1]

    # convert to radians
    latitude1 = radians(latitude1)
    longitude1 = radians(longitude1)

    latitude2 = radians(latitude2)
    longitude2 = radians(longitude2)

    # radius of earth in miles
    earth_radius = 3958.8

    latitude_difference = (
        latitude2 - latitude1
    )

    longitude_difference = (
        longitude2 - longitude1
    )

    a = (

        sin(latitude_difference / 2) ** 2

        +

        cos(latitude1)
        *
        cos(latitude2)
        *
        sin(longitude_difference / 2) ** 2

    )

    c = (
        2
        *
        atan2(
            sqrt(a),
            sqrt(1 - a)
        )
    )

    return earth_radius * c

def get_location_after_time(

    route,

    target_hours

):

    coordinates = route["polyline"]

    total_hours = route["duration_hours"]


    index = int(

        (target_hours / total_hours)

        *

        len(coordinates)

    )


    coordinate = coordinates[index]


    longitude = coordinate[0]

    latitude = coordinate[1]


    return (

        latitude,

        longitude

    )


def get_location_after_distance(

    route,

    target_miles

):

    coordinates = route["polyline"]

    total_distance = (

        route["distance_miles"]

    )


    index = int(

        (target_miles / total_distance)

        *

        len(coordinates)

    )


    coordinate = coordinates[index]


    longitude = coordinate[0]

    latitude = coordinate[1]


    return (

        latitude,

        longitude

    )



def add_timestamps(schedule, start_time=None):
    """Attach real datetime objects + formatted strings to each event."""
    current_time = start_time or datetime.now()

    for event in schedule:
        arrival_time = current_time
        duration = event.get("duration_hours", 0)
        current_time += timedelta(hours=duration)
        departure_time = current_time

        # keep real datetimes so day-splitting can use them
        event["arrival_dt"] = arrival_time
        event["departure_dt"] = departure_time

        event["arrival_time"] = arrival_time.strftime("%I:%M %p")
        event["departure_time"] = departure_time.strftime("%I:%M %p")
        event["window"] = f"{event['arrival_time']} - {event['departure_time']}"

    return schedule