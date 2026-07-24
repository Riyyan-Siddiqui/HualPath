# fuel every 1000 miles

# distance = 2300
# returns:
# 2 fuel stops
from constant import FUEL_STOP_AFTER_MILES
from services.geocoding_service import GeocodingService
from utils import calculate_distance

class FuelService:

    @staticmethod
    def calculate_fuel(data, route):

        fuel_stops = (
            FuelService
            .calculate_fuel_stops(route)
        )

        fuel_locations = (
            FuelService
            .get_fuel_locations(data, route)
        )

        return {
            "fuel_stop_required":
            bool(fuel_stops),

            "fuel_stops":
            fuel_stops,

            "fuel_locations":
            fuel_locations
        }

    @staticmethod
    def get_fuel_locations(data, route):

        fuel_locations = []
        coordinates = route.get("polyline", [])
        # print(coordinates)
        distance_travelled = 0
        next_fuel_stop = FUEL_STOP_AFTER_MILES
        stop_number = 1
      

        for i in range(1, len(coordinates)):
            # previous coordinate
            previous = coordinates[i - 1]

            # current coordinate
            current = coordinates[i]

            # calculating distance between two coordinates
            segment_distance = (
                calculate_distance(
                    previous,
                    current
                )
            )

            # add the distance travelled
            distance_travelled += segment_distance

            # have we reached the next fuel stop?
            while distance_travelled >= next_fuel_stop:

                latitude = current[1]
                longitude = current[0]

                location = (
                    GeocodingService
                    .reverse_geocode(
                        latitude,
                        longitude
                    )
                )
                fuel_locations.append({
                    "event":"Fuel Stop",
                    "stop_number": stop_number,

                    "distance_miles": next_fuel_stop,

                    "city":
                    location.get("city"),

                    "country":
                    location.get("country"),

                    "latitude":
                    latitude,

                    "longitude":
                    longitude,

                    "after_miles": next_fuel_stop
                })

                stop_number +=1
                next_fuel_stop += FUEL_STOP_AFTER_MILES

        return fuel_locations

    @staticmethod
    def calculate_fuel_stops(route):
        distance = route.get("distance_miles", 0)

        return distance // FUEL_STOP_AFTER_MILES

