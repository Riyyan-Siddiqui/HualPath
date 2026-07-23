from math import radians, sin, cos, sqrt, atan2


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