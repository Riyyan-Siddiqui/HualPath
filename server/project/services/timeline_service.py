from utils import get_location_after_distance, get_location_after_time
from services.geocoding_service import GeocodingService

class TimelineService:

    @staticmethod
    def generate_timeline(
        route,
        hos,
        fuel
    ):

        timeline=[]

        # HOS
        for event in hos["driving_schedule"]:

            if "after_hours" in event:

                latitude, longitude = (

                    get_location_after_time(

                        route,

                        event["after_hours"]

                    )

                )

                event["latitude"] = latitude

                event["longitude"] = longitude

            timeline.append(event)



        # Fuel
        for event in fuel["fuel_locations"]:

            latitude, longitude = (

                get_location_after_distance(

                    route,

                    event["after_miles"]

                )

            )

            event["latitude"] = latitude

            event["longitude"] = longitude

            timeline.append(event)

        driving_events = []
        route_events = []

        for event in timeline:
            if "distance_miles" in event:
                route_events.append(event)
            else:
                driving_events.append(event)

        route_events.sort(key=lambda e: e["distance_miles"])

        timeline = driving_events + route_events


        return timeline